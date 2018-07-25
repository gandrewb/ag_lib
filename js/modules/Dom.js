'use strict';

var Dom = function(){};

var proto = Dom.prototype;


proto.createElement = function(options) { // type, attributes, textnode
	var el = document.createElement(options.type);
	
	if (options.attributes !== undefined) {
		for(var attr in options.attributes) {
			el.setAttribute(attr, attributes[attr]);
		}
	}
	
	if (options.textnode !== undefined) {
		var text = document.createTextNode(options.textnode);
		el.appendChild(text);
	}
}


module.exports = Dom;