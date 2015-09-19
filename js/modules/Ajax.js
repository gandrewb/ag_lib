'use strict';

var Ajax = function(options){
	var ajx, response, params='';
	
	if(options.data!='undefined'){
		var ct=0;
		for(idx in options.data){
			ct++;
			var cha = (ct==1) ? '?': '&';
			params+= cha+idx+'='+options.data[idx];
		}
	}
	
	if(window.XMLHttpRequest){
		ajx = new XMLHttpRequest();
	}else{
		ajx = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajx.onreadystatechange = function() {
		if(ajx.readyState==4 && ajx.status==200){
			options.done(ajx.responseText);
		}
	}
	ajx.open(options.type, options.url+params, true);
	ajx.send();
};

module.exports = Ajax;