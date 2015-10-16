var TextNode = require("../text-node.js");

var move_whole_cursor = new function(){
	this.name =  "move_whole_cursor_right";

	this.transform =  function(text_node){
		var description = text_node.describe();
		var new_text;
		ret = [];
		//move right
		if(description.between_caret.length==0){
			new_text = description.before_caret + description.after_caret.slice(0, 1) + "[]" + description.after_caret.slice(1);
		}else{
			new_text = description.before_caret + description.between_caret + "[]" + description.after_caret;
		}
		ret.push(new TextNode(new_text));

		//move left
		if(description.between_caret.length==0){
			new_text = description.before_caret.slice(0, -1) + "[]" + description.before_caret.slice(-1) + description.after_caret;
		}else{
			new_text = description.before_caret + "[]" + description.between_caret + description.after_caret;
		}
		ret.push(new TextNode(new_text));
		return ret;
	}
}

module.exports = move_whole_cursor;