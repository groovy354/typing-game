var React = require("react");
var Target = require("./target.jsx");
var UserInput = require("./user-input.jsx");

module.exports = React.createClass({
	render: function(){
		return (
      <div className="appContainer" style={{fontFamily: "Courier"}}>
  			<h1 className="appHeader">Welcome in Typing Arena!</h1>
        <p className="app-description">Your goal: Rewrite input text so it matches our target text.<br />
         You have to do it as fast as you can, while using keystrokes as little as possible.</p>
        <p className="app-description">This is a target text you shoud have in your input:</p>
        <Target />
        <p className="app-description">...and this is the input. Ready? GO!</p>
        <UserInput />
      </div>
		)
	}
});
