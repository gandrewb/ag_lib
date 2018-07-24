'use strict';

var AG = function(){
	this.version = '1.0.0';
	
	this.Ajax = require('./modules/Ajax');
	//this.Parallax = require('./modules/Parallax');
	this.Url = require('./modules/Url');
};

module.exports(AG);