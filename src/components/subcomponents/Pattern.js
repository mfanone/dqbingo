/*
 *  Pattern Class
 *  Karol Brennan
 *  4.19.2020
 *  This class is used to display the game pattern selected from the dropdown.
 */
import React from 'react';

const FRAME_DURATION_MS = 1500;
const BLANK_GRID = {
  B: [false, false, false, false, false],
  I: [false, false, false, false, false],
  N: [false, false, false, false, false],
  G: [false, false, false, false, false],
  O: [false, false, false, false, false],
};

class Pattern extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frame: 0 };
    this.interval = null;
  }

  componentDidMount() {
    this.startCycling();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pattern !== this.props.pattern) {
      this.setState({ frame: 0 });
      this.startCycling();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startCycling = () => {
    clearInterval(this.interval);
    const frameCount = this.props.pattern.pattern.length;
    if (frameCount > 1) {
      this.interval = setInterval(() => {
        this.setState((state) => ({ frame: (state.frame + 1) % frameCount }));
      }, FRAME_DURATION_MS);
    }
  };

  /*
   *  Render Pattern Function
   *  This will display a bingo card for the pattern chosen in the searchable
   *  drop down, cycling through each entry in its pattern array every
   *  0.5s if it has more than one.
   */
  render() {
    const frames = Array.isArray(this.props.pattern.pattern)
      ? this.props.pattern.pattern
      : [this.props.pattern.pattern];
    const frame = frames[this.state.frame] || frames[0] || BLANK_GRID;
    const pattern = JSON.parse(JSON.stringify(frame));

    return (
      <div id="bingopattern" data-disabled={this.props.disabled}>
        {Object.keys(pattern).map((letter, index) => {
          return(
            <div key={letter + index} className="row vertical-row text-center">
              <div className="col dark-bg white-text"><span>{letter}</span></div>
              {Object.keys(pattern[letter]).map((number, index) => {
                return(
                  <div key={letter + number} className={pattern[letter][number] ? 'selected col' : 'col'}>
                      {letter === "N" && index === 2 ? <span className="free-space">Free Space</span> : <span>&nbsp;</span>}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Pattern;