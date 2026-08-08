/*
 *  Full History Class
 *  Karol Brennan
 *  3.26.2022
 *  This class is used to display the full history of the called balls
 */
import React from 'react';
import ReactDOM from 'react-dom';

class CallHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showFullCallHistory: false
    };
  }

  /**
   * Full history modal display
   *
   * @return  {[JSX]}  Return modal or empty div
   */
   get fullHistoryDisplay() {
    const ballHistory = [...this.props.calledBalls].reverse();
    if(this.state.showFullCallHistory === true){
      return ReactDOM.createPortal(
        <div>
          <div className="modal">
            <button className="modal-close" aria-label="Close" onClick={() => {this.setState({showFullCallHistory:false})}}>&times;</button>
            <h4 className="margin-md">Full Call History</h4>
            <div className="x-small-text margin-bottom-lg">Most recent call listed first, left to right, top to bottom.</div>
            <div className="previous-calls">
              {ballHistory.map(call => {
                return (
                  <div key={call.number} className={call.color}><span>{call.letter}{call.number}</span></div>
                )
              })}
            </div>
          </div>
          <div className="modal-backdrop" onClick={(e) => {e.preventDefault();}}></div>
        </div>,
        document.body
      )
    } else {
      return null
    }
  }

  
  /**
   *  Shows a list of the last 5 balls called
   *
   * @return  {[JSX]}  Div that contains a list of 5 most recent calls
   */
   get previousCallListDisplay() {
     if(this.props.calledBalls.length > 0){
      const previousCallList = [...this.props.calledBalls];
      let last5Calls = previousCallList.reverse().slice(1,6);
      if(last5Calls.length > 0){
        return (
          <div className="margin-vertical-xlg">
            <div className="previous-calls padding-vertical-xlg">
              {last5Calls.map(call => {
                return (
                  <div key={call.number} className={call.color}><span>{call.letter}{call.number}</span></div>
                )
              })}
            </div>
            <div className="text-center">
              <span className="uppercase x-small-text previous-calls-label">Previous 5 Calls</span>
              <button className="textOnly x-small-text uppercase show-full-history-link" onClick={() => {this.setState({showFullCallHistory:true})}}>show full history</button>
            </div>
            {this.fullHistoryDisplay}
          </div>
        );
      } else {
        return <div></div>
      }
    } else {
      return <div></div>
    }
  }

  render() {
    if(this.props.calledBalls.length > 1){
      return (
        <div className="text-center">
          {this.previousCallListDisplay}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CallHistory;