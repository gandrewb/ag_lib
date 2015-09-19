'use strict';

var Parallax = function(){
	
	
	//I don't expect any of this will work in its current state. Needs to be refactored to work as module
	
	
	this.parallax = function(el, props){
		console.log('Occasionally the additional height of the image itself (600px) is not added into the calculation — the distance property perhaps? I think there must be some kind of race condition going on there. Multiple transforms that end early do not persist.');		
		prlx.calc();
		prlx.parallaxes.push(new Changeling(el, props));
		prlx.setPrefix();
		requestAnimationFrame(prlx.render);
	};
	
	var prlx = {
		parallaxes: [],
		prefix: null,
		previous: {top: null, left: null},
		scroll: {top: null, left: null},
		timer: null,
		win: {w:null, h:null},
		transforms: ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'translate', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skew', 'skewX', 'skewY'],
		
		calc: function(){
			prlx.win.w = window.innerWidth;
			prlx.win.h = window.innerHeight;
		},
		render: function(){
			prlx.scroll.top = window.pageYOffset;
			prlx.scroll.left = window.pageXOffset;
				
			if(prlx.previous.top!=prlx.scroll.top || prlx.previous.left!=prlx.scroll.left){
				prlx.previous.top = prlx.scroll.top;
				prlx.previous.left = prlx.scroll.left;
				for(var x=0, len=prlx.parallaxes.length; x<len; x++){
					prlx.parallaxes[x].draw();
				}
			}
			requestAnimationFrame(prlx.render);
		},
		setPrefix: function(){
			var pre = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'oTransform'];
			var el = document.createElement('div');
			for (var x=0, len=pre.length; x<len; x++){
				if(pre[x] in el.style){
					prlx.prefix = pre[x];
				}
			}
		}
	};
	
	function Changeling(el, sh){
		this.draw = function(){			
			var transforms = '';
			var change = false;
			
			for(var x=0, len=this.shifts.length; x<len; x++){
				var s = this.shifts[x];
				var scroll = (s.direction == 'horizontal') ? prlx.scroll.left : prlx.scroll.top;
				
				if(s.start_at<scroll && scroll<s.end_at){
					change = true;
					
					if(s.is_transform){
						transforms += s.property+'('+ this.getValue(s, scroll) +') ';
					}else{
						this.el.style[s.property] = this.getValue(s, scroll);
					}
				}
			}
			
			if(change){
				this.el.style[prlx.prefix] = transforms;
			}
		};
		this.getValue = function(shift, scroll){
			var percent = (scroll - shift.start_at) / shift.scroll_size;			
			var incr = shift.prop_diff * percent;
			var val = shift.start_val + incr;
			val = (shift.unit=='px') ? Math.round(val): val.toFixed(2);
			return val + shift.unit;
		};
		this.newShift = function(shift){
			shift.is_transform = (prlx.transforms.indexOf(shift.property)>-1);
			shift.prop_diff = shift.end_val - shift.start_val;
			shift.unit = (typeof shift.unit == 'undefined') ? '': shift.unit;
			
			var orient = (shift.direction == 'horizontal') ? this.horiz: this.vert;
			
			shift.start_at = (typeof shift.start == 'undefined') 
				? orient.start
				: orient.start + (orient.size * shift.start);
			shift.end_at = (typeof shift.end == 'undefined') 
				? orient.end
				: orient.start + (orient.size * shift.end);
			shift.scroll_size = shift.end_at - shift.start_at;
			
			this.shifts.push(shift);
		};
		
		//init
		this.el = el;
		this.box_pos = this.el.getBoundingClientRect();
		this.vert = {
			start: this.box_pos.top - prlx.win.h,
			end: this.box_pos.bottom,
			size: Math.abs( (this.box_pos.bottom + prlx.win.h) - this.box_pos.top )
		};
		this.horiz = {
			start: this.box_pos.left - prlx.win.w,
			end: this.box_pos.right,
			size: Math.abs( (this.box_pos.right + prlx.win.w) - this.box_pos.left )
		};		
		this.shifts = [];
		
		for(var i=0, len=sh.length; i<len; i++){
			this.newShift(sh[i]);
		}
	}
	
	window.addEventListener('resize', function(){
		prlx.calc();
	});
	
	
	
	
};

module.exports = Parallax;