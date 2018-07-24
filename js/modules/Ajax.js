'use strict';

var Ajax = function(options){ //data, url, type, done
	var ajx, response, params='';
	
	if(options.data!==undefined){
		var ct=0;
		for(var idx in options.data){
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