var TextNode = require("./text-node.js");
var uniqueBy = require("unique-by");

var Task = function(beginning_text, target_text){
	this.beginning_text = new TextNode(beginning_text);
	this.target_text = new TextNode(target_text);

	this.get_minimal_steps = function(){
		console.log("analyzing transition from `", this.beginning_text.text + "` to `" + this.target_text.text + "`")
		var steps = 0;
		var current_state = {text_node: this.beginning_text, depth: 0};
		var queue = [];
		var found = false;
		while(steps<10000 && !found){
			steps++;
			var next_possible_nodes = current_state.text_node.all_next_states();
			var next_possible_states = next_possible_nodes.map(function(text_node){
				return {
					depth: current_state.depth + 1,
					text_node: text_node					
				}
			})
			queue = queue.concat(next_possible_states);
			/*
			/so far the below code slows the process down instead of speeding it up.
			queue = uniqueBy(queue, function(state){
				return state.text_node.text
			});
			*/
			current_state = queue.splice(0, 1)[0]; //shortens queue
			found = current_state.text_node.text==this.target_text.text;
		}
		if(found){
			return current_state.depth;			
		}else{
			return Infinity;
		}
	}

}

module.exports = Task;

console.log(new Task("ala[] ma kota", "ala ma[] kota").get_minimal_steps());
console.log(new Task("ala[] ma kota", "ala ma []kota").get_minimal_steps());
console.log(new Task("ala[] ma kota", "la ma ko[]ta").get_minimal_steps());

