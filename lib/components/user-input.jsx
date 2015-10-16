var React = require("react");

var CaretableInput = require("./caretable-input.jsx");

var UserInput = React.createClass({
	getInitialState: function(){
		return {
			current_text_representation: this.props.text_representation,
			last_initial_tr: this.props.initial_text_representation,
			userInputNumber: 0,
			caret_position: {
				begin: 0,
				end: 0
			},
			display_text: ""
		}
	},
	countUserInput: function(event){
		var add = 1;
		if(event.which == 91) {add = 0;};
		this.setState({
			userInputNumber: this.state.userInputNumber + add
		})
	},
	componentWillMount: function(){
		this.setState({
			current_text_representation: this.props.initial_text_representation,
		})
	},
	handleChange: function(e){
		this.setState({
			current_text_representation: this.refs.caretable.getTextualRepresentation(),
		})
	},
	handleKeyDown: function(event){
		var self = this;
		var add = 1;
		if(event.which == 91) {add = 0;};
		this.setState({
			userInputNumber: this.state.userInputNumber + add
		})
		setTimeout(
			function(){
				self.setState({
					current_text_representation: self.refs.caretable.getTextualRepresentation(),
				});					
			}
		, 0)
	},
	componentDidUpdate: function(new_props){
		if(new_props.initial_text_representation!=this.state.last_initial_tr){
			this.setState({
				current_text_representation: new_props.initial_text_representation,
				last_initial_tr: new_props.initial_text_representation,
				userInputNumber: 0
			})
		}
	},
	render: function(){
		var input_style = {width: "600px", height: "40px", fontSize: "14px", fontFamily: "Courier"};
		return (
			<div>
			{this.state.current_text_representation}
			<CaretableInput ref="caretable" text_representation={this.state.current_text_representation} onKeyDown={this.handleKeyDown} onChange={this.handleChange}/>
			<h4>Number of keystrokes: </h4>
			<p>{this.state.userInputNumber}</p>
			</div>
		)
	}
});
module.exports = UserInput;
