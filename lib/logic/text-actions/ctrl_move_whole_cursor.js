var TextNode = require("../text-node.js");

var ctrl_move_whole_cursor = new function(){
	this.name =  "ctrl_move_whole_cursor_right";

	this.transform =  function(text_node){
		var d = text_node.describe();
		var new_text;
		var new_caret_index;
		ret = [];
		//ctrl + move right
		var next_non_whitespace_pattern = /\w\W/;

		if(d.single_caret || d.caret_direction=="right"){
			if(d.after_caret.match(next_non_whitespace_pattern)!=null){
				new_caret_index = d.after_caret.match(next_non_whitespace_pattern).index + 1;
				new_text = d.before_caret + d.between_caret + d.after_caret.slice(0, new_caret_index) + "[]" + d.after_caret.slice(new_caret_index);
			}else{
				new_text = d.before_caret + d.between_caret + d.after_caret + "[]";
			}			
		}else{
			//has >0 chars in selection
			//direction == left
			var merged_text = d.between_caret + d.after_caret;
			if(merged_text.match(next_non_whitespace_pattern)!=null){
				new_caret_index = merged_text.match(next_non_whitespace_pattern).index + 1;
				new_text = d.before_caret + merged_text.slice(0, new_caret_index) + "[]" + merged_text.slice(new_caret_index);
			}else{
				new_text = d.before_caret + d.between_caret + d.after_caret + "[]";
			}
		}
		ret.push(new TextNode(new_text));

		//ctrl + move left
		var prev_non_whitespace_pattern = /\W\w/;

		if(d.single_caret || d.caret_direction=="left"){
			if(d.before_caret.match(prev_non_whitespace_pattern)!=null){
				new_caret_index = d.before_caret.match(prev_non_whitespace_pattern).index + 1;
				new_text = d.before_caret.slice(0, new_caret_index) + "[]" + d.before_caret.slice(new_caret_index) + d.after_caret;
			}else{
				new_text = "[]" + d.before_caret + d.between_caret + d.after_caret;
			}			
		}else{
			//has >0 chars in selection
			//selection direction == right
			var merged_text = d.before_caret + d.between_caret;
			if(merged_text.match(prev_non_whitespace_pattern)!=null){
				new_caret_index = merged_text.match(prev_non_whitespace_pattern).index + 1;
				new_text = merged_text.slice(0, new_caret_index) + "[]" + merged_text.slice(new_caret_index) + d.after_caret;
			}else{
				new_text = "[]" + d.before_caret + d.between_caret + d.after_caret;
			}
		}
		ret.push(new TextNode(new_text));

		//ctrl + move left
		return ret;
	}
}

module.exports = ctrl_move_whole_cursor;

/*
console.log(ctrl_move_whole_cursor.transform(new TextNode("[ala ma] kota")))
console.log(ctrl_move_whole_cursor.transform(new TextNode("]ala ma[ kota")))
*/