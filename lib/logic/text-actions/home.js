var TextNode = require("../text-node.js");

var home = new function(){
	this.name =  "home";

	this.transform =  function(text_node){
		var d = text_node.describe();
		var new_text = "[]" + d.before_caret + d.between_caret + d.after_caret;
		return [new TextNode(new_text)];
	}
}

module.exports = home;