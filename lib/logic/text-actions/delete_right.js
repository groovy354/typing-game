var TextNode = require("../text-node.js");

var delete_right = new function(){
	this.name =  "delete_right";

	this.transform =  function(text_node){
		var description = text_node.describe();
		var new_text;
		if(description.between_caret.length==0){
			new_text = description.before_caret + "[]" + description.after_caret.slice(1);
		}else{
			new_text = description.before_caret + "[]" + description.after_caret;
		}
		return [new TextNode(new_text)];
	}
}

module.exports = delete_right;