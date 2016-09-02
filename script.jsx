var StarsFrame = React.createClass( {
  render: function() {
  
    var stars = [];
  
    for(var i = 0; i < this.props.numStars; i++) {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>    
    );
  }
});

var ButtonFrame = React.createClass( {
  render: function() {
    
    var checkNum = this.props.checkNum;
    var correct = this.props.correct;
    var redrawNum = this.props.redrawNum;
    var button;
    
   switch(correct) {
      case true:
      button = (
        <button className="btn btn-success btn-lg"
                onClick={this.props.acceptAnswer}>
          <span className="glyphicon glyphicon-ok"></span>
        </button>
      );
      break;
      
      case false:
      button = (
        <button className="btn btn-danger btn-lg">
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      );
      break;
      
      default:
      var disabled = (this.props.selectedNums.length === 0);
      button = (
        <button className="btn btn-primary btn-lg" disabled={disabled}
         onClick={checkNum}>
        =
        </button>
      );
    }
    
    return (
      
      <div id="button-frame">
        {button}
        <br/><br/>
        <button className="btn btn-warning btn-xs"
                onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh"></span>
          {redrawNum}
        </button>
      </div>
     
    )
  }
});

var AnswerFrame = React.createClass( {
  render: function() {
    var props = this.props;
    var selectedNumbers = props.selectedNums.map(function(i) {
      return (
        <span onClick={props.unclickNum.bind(null, i)}>
          {i}
        </span>
      )
    });
    
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>    
    )
  }
});

var NumbersFrame = React.createClass( {
  render: function() {
    
    var numbers = [], className, 
    clickNum = this.props.clickNum,
    selectedNums=this.props.selectedNums,
    usedNums = this.props.usedNums;
    
    
    for(var i = 1; i < 10; i++ ){
      className = "number selected-" + (selectedNums.indexOf(i)>=0);
      className += " used-" + (usedNums.indexOf(i)>=0);
      numbers.push(<div className={className} onClick={clickNum.bind(null, i)}>
                    {i}
                   </div>);
    }
    
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>    
    )
  }
});

var Game = React.createClass({
  
  getInitialState: function() {
    return( {numStars: Math.floor(Math.random()*9) + 1,
             selectedNums: [],
             usedNums: [],
             correct: null,
             redrawNum: 0
    } );
  },
  
  clickNum: function(clickedNum) {
    if(this.state.selectedNums.indexOf(clickedNum) < 0) {
      this.setState(
          {selectedNums: this.state.selectedNums.concat(clickedNum),
           correct: null
          }
        );
    }
  },
  
  unclickNum: function(clickedNum) {
    var selectedNums = this.state.selectedNums,
        index = selectedNums.indexOf(clickedNum);
    
    selectedNums.splice(index, 1);
    
    this.setState({selectedNums: selectedNums, correct: null});
  },
  
  sumOfSelected: function() {
    return (
      this.state.selectedNums.reduce(function(a,b) {
        return a+b;
      }, 0)
    );
  },
  
  checkNum: function() {
    var correct = (this.state.numStars === this.sumOfSelected());
    this.setState({correct: correct});
  },
  
  acceptAnswer: function() {
    var usedNums = this.state.usedNums.concat(this.state.selectedNums);
    this.setState(
      {selectedNums: [], 
       usedNums:usedNums, 
       correct:null,
       numStars: Math.floor(Math.random()*9) + 1
      }
    )
  },
  
  redraw: function() {
    if(this.state.redrawNum < 5) {
      this.setState({numStars: Math.floor(Math.random()*9) + 1,
                     correct: null,
                     selectedNums: [],
                     redrawNum: this.state.redrawNum+1 })
    }
  },
  
  render: function() {
    var selectedNums = this.state.selectedNums,
        usedNums = this.state.usedNums,
        numStars = this.state.numStars,
        redrawNum = this.state.redrawNum,
        correct = this.state.correct;
    return (
      <div id="game">
        <h2>Play 9</h2>
        <hr />
          <div id="clearfix">
          
          <StarsFrame numStars = {numStars} />
          <ButtonFrame selectedNums={selectedNums}
                       correct={correct}
                       checkNum={this.checkNum}
                       acceptAnswer={this.acceptAnswer}
                       redraw={this.redraw}
                       redrawNum={redrawNum}/>
          <AnswerFrame selectedNums={selectedNums}
                       unclickNum={this.unclickNum} />
          
          </div>
          
          <NumbersFrame selectedNums={selectedNums}
                        usedNums    ={usedNums}
                        clickNum    ={this.clickNum} 
                        acceptAnswer={this.acceptAnswer}/>
          
      </div>
    )
  }
  
});
React.render(
  <Game />,
  document.getElementById('container')
);
