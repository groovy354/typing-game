var React = require("react");
var Target = require("./target.jsx");
var UserInput = require("./user-input.jsx");

var Task = require("../logic/task.js");

var input_style = {width: "600px", height: "40px", fontSize: "14px", fontFamily: "Courier"};

module.exports = React.createClass({
    getInitialState: function(){
        return {
            begin_text: "N[etgu]ruuuu ",
            target_text: "Netguru[]"
        }
    },
    changeBegin: function(e){
        this.setState({
            begin_text: e.target.value
        })
    },
    changeTarget: function(e){
        this.setState({
            target_text: e.target.value
        })
    },
    getNeededMoves: function(){
        var task = new Task(this.state.begin_text, this.state.target_text);
        return task.get_minimal_steps();
    },
	render: function(){
		return (
          <div className="appContainer" style={{fontFamily: "Courier"}}>
              <h1 className="appHeader">Welcome in Typing Arena!</h1>
              <br/>
              <br/>
              <br/>
              <span>Begin text:</span>
              <input type="text" value={this.state.begin_text} style={input_style} onChange={this.changeBegin}/>
              <br/>
              <span>Target text:</span>
              <input type="text" value={this.state.target_text} style={input_style}  onChange={this.changeTarget}/>
              <span style={{color: "green"}}> This can be solved in <b>{this.getNeededMoves()}</b> steps</span>
              <UserInput initial_text_representation={this.state.begin_text}/>
          </div>
          )
	}
});
