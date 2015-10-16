var uniqueBy = require('unique-by');

var TextNode = function(text){

	this.text = text;
}

module.exports = TextNode;
//var AllActions = requireDir("./text-actions");

AllActions = {
	"backspace": require("./text-actions/backspace"),
	"ctrl_move_whole_cursor": require("./text-actions/ctrl_move_whole_cursor"),
	"delete_right": require("./text-actions/delete_right"),
	"end": require("./text-actions/end"),
	"home": require("./text-actions/home"),
	"move_whole_cursor": require("./text-actions/move_whole_cursor"),
}


TextNode.prototype = new function(){
	this.describe = function(){
		/*
			var before_caret_pattern = /(.*([^\\]|))\[/;
			var between_caret_pattern = /(\[(.*([^\\]|))\]|\](.*([^\\]|))\[)/;
			var after_caret_pattern = /([^\\]\](.*)|[^\\]\[(.*))/;
		*/
		var ret = {}

		var begin_caret_pattern = /([^\\\]]|)\[/;
		var end_caret_pattern = /([^\\\[]]|)\]/;
		if(this.text.match(begin_caret_pattern).index < this.text.match(end_caret_pattern).index){

			ret.caret_direction = "right";

			var before_caret_pattern = /(.*([^\\]|))\[/;
			var between_caret_pattern =  /\[(.*([^\\]|))\]/;
			var after_caret_pattern = /[^\\]\](.*)/;
		}else{

			ret.caret_direction = "left";

			var before_caret_pattern = /(.*([^\\]|))\]/;
			var between_caret_pattern = /\](.*([^\\]|))\[/;
			var after_caret_pattern = /[^\\]\[(.*)/;
		}

		//console.log(this.text);

		ret.before_caret = this.text.match(before_caret_pattern)[1];
		ret.between_caret = this.text.match(between_caret_pattern)[1];
		ret.after_caret = this.text.match(after_caret_pattern)[1];

		ret.has_selection = ret.between_caret.length > 0;
		ret.single_caret = ret.between_caret.length == 0;

		return ret;
	}

	this.all_next_states = function(){
		var next_states = [];
		for(var action_name in AllActions){
			var action = AllActions[action_name];
			next_states = next_states.concat(action.transform(this));
		}

		return uniqueBy(next_states, 'text');
	}
}