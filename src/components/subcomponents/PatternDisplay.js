/*
 *  Pattern Display Class
 *  Karol Brennan
 *  5.21.2022
 *  This class is used to display game patterns
 */
import React from 'react';

class PatternDisplay extends React.Component {

  /*
   *  Render Pattern Function
   *  This will display a bingo card with a pattern active
   */
  render() {
    const pattern = JSON.parse(JSON.stringify(this.props.pattern));
    const patternGrid = pattern.pattern[0];

    return (
      <section>
        <h5>{pattern.label}</h5>
        <div className="bingopattern container">
          {Object.keys(patternGrid).map((letter, index) => {
            return(
              <div key={letter + index} className="row vertical-row text-center">
                <div className="col dark-bg white-text"><span>{letter}</span></div>
                {Object.keys(patternGrid[letter]).map((number, index) => {
                  return(
                    <div key={letter + number} className={patternGrid[letter][number] ? 'selected col' : 'col'}>
                      {letter === "N" && index === 2 ? <span className="free-space">Free Space</span> : <span>&nbsp;</span>}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    );
  }
}

export default PatternDisplay;