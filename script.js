class Buzzer extends React.Component{
     componentDidMount() {
        document.getElementById('beep').play();
     }
     render(){
       return (
       <audio id="beep" autoplay='autoplay'><source src="http://www.freesound.org/data/previews/175/175081_1272140-lq.mp3" /></audio>
       );
     }
   }

       class SetTimer extends React.Component{
  render(){
    return (
      <div className="set-timer">work <br/> session
          <div className="minus-add">
            <button className="setting-button" id="minus-timer" onClick={this.props.minus}>-</button>
            <button className="setting-button" id="add-timer" onClick={this.props.add}>+</button>
          </div>
      </div>
    );
  }
}

class SetBreak extends React.Component{

  render(){
    return (
      <div className="set-break"> break<br/> session
          <div className="minus-add">
            <button className="setting-button" id="minus-break" onClick={this.props.minusbreak}>-</button>
            <button className="setting-button" id="add-break" onClick={this.props.addbreak}>+</button>
          </div>
      </div>
    );
  }
}

const leftPad = (time)=>{
  return (time<10)? '0'+time :time
}
const TimerDisplay = (props) => (
  <div className="timer-display"><span className="worklabel">Work session time</span><br/>
      {leftPad(props.currentMoment.get('minutes'))+":"+leftPad(props.currentMoment.get('seconds'))}
      <div className="breaktime"><span className="breaklabel">break session time</span><br/>{props.breakTime.get('minutes')+":"+leftPad(props.breakTime.get('seconds'))}</div>
    </div>
);
// let baseTime= 25;
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentMoment: moment.duration(25, 'minutes'),
      breakMoment: moment.duration(5, 'minutes'),
      baseMoment: null,
      timer:null,
      breaktimer:null,
      startbuttonvisible:true,
      pausebuttonvisible:false,
      resumebuttonvisible:false,
      stopbuttonvisible:false,
      workFinish:false,
      breakFinish:false
    }
    this.minus =this.minus.bind(this);
    this.add =this.add.bind(this);
    this.minusbreak =this.minusbreak.bind(this);
    this.addbreak =this.addbreak.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.pauseBreakTimer = this.pauseBreakTimer.bind(this);
    this.resumeBreakTimer = this.resumeBreakTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.reduceBreakTimer = this.reduceBreakTimer.bind(this);

  }
  add(){
    if(this.state.currentMoment.get('minutes') <= 58 ) {
      this.setState({
        currentMoment:this.state.currentMoment.add(1,'minutes')
      });
    }
  }
  minus(){
    if(this.state.currentMoment.get('minutes') !== 0 ) {
      this.setState({
        currentMoment:this.state.currentMoment.subtract(1,'minutes')
      });
    }
  }
  addbreak(){
    if(this.state.breakMoment.get('minutes') <= 58 ) {
      this.setState({
        breakMoment:this.state.breakMoment.add(1,'minutes')
      });
    }
  }
  minusbreak(){
    if(this.state.breakMoment.get('minutes') !== 0 ) {
      this.setState({
        breakMoment:this.state.breakMoment.subtract(1,'minutes')
      });
    }
  }
  startTimer(){
    this.setState({
      timer: setInterval(this.reduceTimer, 1000),
      baseMoment: this.state.currentMoment,
      startbuttonvisible:false,
      pausebuttonvisible:true,
      stopbuttonvisible:true,
      workFinish:false,
    });
  }
  pauseTimer(){
    clearInterval(this.state.timer);
    this.setState({
      pausebuttonvisible:false,
      resumebuttonvisible:true,
    });
  }
  resumeTimer(){
    this.setState({
      timer: setInterval(this.reduceTimer, 1000),
      startbuttonvisible:false,
      pausebuttonvisible:true,
      stopbuttonvisible:true,
      resumebuttonvisible:false,
    });
  }
  pauseBreakTimer(){
    clearInterval(this.state.breaktimer);
    this.setState({
      pausebuttonvisible:false,
      resumebuttonvisible:true,
    });
  }
  resumeBreakTimer(){
    this.setState({
      breaktimer: setInterval(this.reduceBreakTimer, 1000),
      startbuttonvisible:false,
      pausebuttonvisible:true,
      stopbuttonvisible:true,
      resumebuttonvisible:false,
    });
  }
  stopTimer(){
    clearInterval(this.state.timer);
    clearInterval(this.state.breaktimer);
    this.setState({
      currentMoment:moment.duration(25, 'minutes'),
      breakMoment:moment.duration(5, 'minutes'),
      timer: null,
      breaktimer: null,
      startbuttonvisible:true,
      pausebuttonvisible:false,
      stopbuttonvisible:false,
      resumebuttonvisible:false,
    });
  }
  reduceTimer(){
    if(this.state.currentMoment.get('minutes') === 0 && this.state.currentMoment.get('seconds') === 0) {
      clearInterval(this.state.timer);

      this.setState({
        timer: null,
        startbuttonvisible:true,
        pausebuttonvisible:false,
        stopbuttonvisible:false,
        resumebuttonvisible:false,
        workFinish: true,
      });

      if(this.state.breakMoment.get('minutes') !== 0 ) {

        this.setState({
            breaktimer: setInterval(this.reduceBreakTimer, 1000),
            startbuttonvisible:false,
            pausebuttonvisible:true,
            stopbuttonvisible:true,
        });
      }

      return;
    }
    else {
      this.setState({
        currentMoment: this.state.currentMoment.subtract(moment.duration(1, 'second')),
      });
    }
  }
  reduceBreakTimer(){
    if(this.state.breakMoment.get('minutes') === 0 && this.state.breakMoment.get('seconds') === 0) {
      clearInterval(this.state.breaktimer);
      this.setState({
        breaktimer: null,
        startbuttonvisible:true,
        pausebuttonvisible:false,
        stopbuttonvisible:false,
        resumebuttonvisible:false,
        breakFinish:true,
      });
      return;
    }
    this.setState({
      breakMoment: this.state.breakMoment.subtract(moment.duration(1, 'second')),
    });
  }
  render() {

    return (
      <div className="container">
         <div className="timebox">
            <div className="header">
                    POMODORO POWER
                    { (this.state.workFinish) &&
                      <Buzzer />
                    }
            </div>
            <TimerDisplay currentMoment={this.state.currentMoment} breakTime={this.state.breakMoment}/>
            <div id="action-title">
                <small>SETTINGS</small>
            </div>
            <div className="actions">
              <SetTimer minus={this.minus} add={this.add}/>
              <SetBreak minusbreak={this.minusbreak} addbreak={this.addbreak}/>
            </div>
           <div className="timer-control">
            {this.state.startbuttonvisible ? <button id="start-timer" onClick={ this.startTimer }>
                START
            </button> : null}
           {this.state.pausebuttonvisible ? <button id="pause-timer" onClick={this.state.workFinish ? this.pauseBreakTimer:this.pauseTimer}>
                PAUSE
            </button>: null}
           {this.state.resumebuttonvisible ? <button id="resume-timer" onClick={this.state.workFinish ? this.resumeBreakTimer:this.resumeTimer}>
                RESUME
            </button>: null}
           {this.state.stopbuttonvisible ? <button id="stop-timer" onClick={this.stopTimer}>
                STOP
            </button>: null}
           </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);