'use strict';

var Dom = function(){};

var proto = Dom.prototype;


proto.createElement = function(element, attributes) { // {"attr": "value", "attr2": "value2"}
	var el = document.createElement(element);
	
	for(var attr in attributes) {
		el.setAttribute(attr, attributes[attr]);
	}
}


module.exports = Dom;