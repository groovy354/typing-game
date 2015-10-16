var React = require("react");

var input_style = {width: "600px", height: "40px", fontSize: "14px", fontFamily: "Courier"};


var CaretableInput = React.createClass({
	componentDidMount: function(){
		this.setCaret();
	},
	readCaretPosition: function(){
		var text_representation_copy = this.props.text_representation;
		var begin_caret_pattern = /(?=[^\\\]]|)\[/;
		var end_caret_pattern = /(?=[^\\\[]]|)\]/;
		var begin_caret_index = text_representation_copy.match(begin_caret_pattern).index;
		var end_caret_index = text_representation_copy.match(end_caret_pattern).index;


		if(begin_caret_index < end_caret_index){
			text_representation_copy =  text_representation_copy.slice(0, begin_caret_index) + text_representation_copy.slice(begin_caret_index+1, end_caret_index) + text_representation_copy.slice(end_caret_index+1);
			end_caret_index--;
		}else{
			text_representation_copy =  text_representation_copy.slice(0, end_caret_index) + text_representation_copy.slice(end_caret_index+1, begin_caret_index) + text_representation_copy.slice(begin_caret_index+1);
			begin_caret_index--;
		}
		return {
			begin: begin_caret_index,
			end: end_caret_index
		}
	},
	setCaret: function(){
		var caret_position = this.readCaretPosition();
		this.refs["the_input"].setSelectionRange(caret_position.begin, caret_position.end);
		this.refs["the_input"].focus();
	},
	componentDidUpdate: function(){
		console.log("will update");
		this.setCaret();
	},
	getTextualRepresentation: function(){
		console.log(this.props);
		var the_input = this.refs.the_input;
		var pure_text = this.refs.the_input.value;
		if(the_input.selectionStart <= the_input.selectionEnd){
			return pure_text.slice(0, the_input.selectionStart) + "[" + pure_text.slice(the_input.selectionStart, the_input.selectionEnd) + "]" + pure_text.slice(the_input.selectionEnd);
		}else{
			return pure_text.slice(0, the_input.selectionEnd) + "]" + pure_text.slice(the_input.selectionEnd, the_input.selectionStart) + "[" + pure_text.slice(the_input.selectionStart);
		}
	},
	getDisplayText: function(){
		console.log(this.props);
		var text_representation_copy = this.props.text_representation;
		if(text_representation_copy==""){
			return "";
		}
		var begin_caret_pattern = /(?=[^\\\]]|)\[/;
		var end_caret_pattern = /(?=[^\\\[]]|)\]/;
		var begin_caret_index = text_representation_copy.match(begin_caret_pattern).index;
		var end_caret_index = text_representation_copy.match(end_caret_pattern).index;


		if(begin_caret_index < end_caret_index){
			text_representation_copy =  text_representation_copy.slice(0, begin_caret_index) + text_representation_copy.slice(begin_caret_index+1, end_caret_index) + text_representation_copy.slice(end_caret_index+1);
			end_caret_index--;
		}else{
			text_representation_copy =  text_representation_copy.slice(0, end_caret_index) + text_representation_copy.slice(end_caret_index+1, begin_caret_index) + text_representation_copy.slice(begin_caret_index+1);
			begin_caret_index--;
		}
		return text_representation_copy;
	},
	render: function(){
		//onKeyDown={this.props.onKeyDown} 
		return (
			<div>
				<input 
					type="text" 
					value={this.getDisplayText()} 
					ref="the_input" 
					onFocus={this.setCaret}
					onChange={this.props.onChange} 
					onKeyDown={this.props.onKeyDown} 
					style={input_style}  
				/>
			</div>
		)
	}
});

module.exports = CaretableInput;