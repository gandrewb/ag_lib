'use strict';

var Url = function(){
	this.info = {
		hosts: window.location.host.split('.'),
		path: [],
		protocol: window.location.protocol,
		target: window.location.hash,
		vars: {}
	};
	
	var path = window.location.pathname;
	if (path.length>1){
		this.info.path = path.substr(1).split('/');
	}
	
	var get_vars = window.location.href.split('?');
	if(get_vars.length>1){
		get_vars = get_vars[1].split('&');
		for(i in get_vars){
			var kv = get_vars[i].split('=');
			this.info.vars[kv[0]] = kv[1];
		}
	}
};

module.exports = Url;