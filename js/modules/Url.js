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
		for(var i in get_vars){
			var kv = get_vars[i].split('=');
			this.info.vars[kv[0]] = kv[1];
		}
	}
};

var proto = Url.prototype;




/*
{ 
	vars: [{key: "foo", val: "bar"}],
	title: ''
	history: true
}
*/

proto.addVariables = function(options) {
	options.vars    = options.vars || [];
	options.title   = options.title || '';
	options.history = options.history !== false;
	
	for(var i=0, len=options.vars.length; i<len; i++) {
		var newvar = options.vars[i];
		this.info.vars[newvar.key] = newvar.val;
	}
	
	var newpath = this._assembleURL(false);
	
	if(options.history) {
		window.history.pushState('object or string', options.title, newpath);
	} else {
		window.history.replaceState('object or string', options.title, newpath);
	}
};

proto.getInfo = function() { return this.info; };



proto._assembleURL = function(includehost) {
	
	var vars = '';
	var hash = '';
	var ct = 0;
	
	for(var key in this.info.vars){
		if(this.info.vars[key]) {
			var sep = (ct>0) ? '&' : '?';
			vars += sep + key + '=' + this.info.vars[key];
			ct++;
		}
	}
	
	if(this.info.target) {
		hash = '#' + this.info.target;
	}
	
	var newpath = '/' + this.info.path.join('/') + vars + hash;
	
	if(includehost) {
		return this.info.protocol + '//' + this.info.hosts.join('.') + newpath;
	} else {
		return newpath;
	}
};

module.exports = Url;