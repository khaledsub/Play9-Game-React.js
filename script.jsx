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
    var result = this.props.result;
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
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
    selectedNums=this.props.selectedNums;
    
    for(var i = 1; i < 10; i++ ){
      className = "number selected-" + (selectedNums.indexOf(i)>=0);
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
             result: "="
    } );
  },
  
  clickNum: function(clickedNum) {
    if(this.state.selectedNums.indexOf(clickedNum) < 0) {
      this.setState(
          {selectedNums: this.state.selectedNums.concat(clickedNum)}
        );
    }
  },
  
  unclickNum: function(clickedNum) {
    var selectedNums = this.state.selectedNums,
        index = selectedNums.indexOf(clickedNum);
    
    selectedNums.splice(index, 1);
    
    this.setState({selectedNums: selectedNums});
  },
  
  render: function() {
    var selectedNums = this.state.selectedNums,
        numStars = this.state.numStars;
    return (
      <div id="game">
        <h2>Play 9</h2>
        <hr />
          <div id="clearfix">
          
          <StarsFrame numStars = {numStars} />
          <ButtonFrame />
          <AnswerFrame selectedNums={selectedNums}
                       unclickNum={this.unclickNum} />
          
          </div>
          
          <NumbersFrame selectedNums={selectedNums}
                        clickNum    ={this.clickNum}              />
          
      </div>
    )
  }
  
});
React.render(
  <Game />,
  document.getElementById('container')
);
