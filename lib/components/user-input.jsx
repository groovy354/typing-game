var React = require("react");
var UserInput = React.createClass({
  getInitialState: function(){
    return {
      userInputNumber: 0
    }
  },
  countUserInput: function(event){
    var add = 1;
    if(event.which == 91) {add = 0;};
    this.setState({
      userInputNumber: this.state.userInputNumber + add
    })
  },
  render: function(){
    return (
      <div>
        <input type="text" style={{width: "600px", height: "40px", fontSize: "14px", fontFamily: "Courier"}} defaultValue="Netguru to nagorszy software house w Polsce[]" onKeyDown={this.countUserInput} />
        <h4>Number of keystrokes: </h4>
        <p>{this.state.userInputNumber}</p>
      </div>
    )
  }
});
module.exports = UserInput;
