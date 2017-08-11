'use strict';
//jquery 命名空间。只暴露出一个OrionEditor。保证一些私有方法不会和其他人的代码冲突
(function( global, factory ) {
    //应该是为了可以应用在requirejs等库中
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "orionEditor requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        //无模块环境时
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal){
	let ctx = [],
	    isPC = function IsPC() {
			var userAgentInfo = navigator.userAgent;
		    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
		    var flag = true;
			for (var v = 0; v < Agents.length; v++) {
			    if (userAgentInfo.indexOf(Agents[v]) > 0) {
			        flag = false;
			        break;
			    }
			}
			return flag;
		}(),
	    a;
	let start = function(){
		if(this.opts.dom){
			try{
				ctx.push(this.opts.dom.getContext("2d"));
				this.index = ctx.length - 1;
				init(this);
			}catch(err){
                console.error(err);
                return 0;
			}
			init(this);
		}
		else{
			console.warn("no dom to init");
		}
	},
	init = function(obj){
		let _this = obj,
		    winWidth,
		    winHeight,
		    width,
			height;
		// 获取窗口宽度
		if (window.innerWidth)
			winWidth = window.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
		// 获取窗口高度
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		// 通过深入 Document 内部对 body 进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
		if(_this.opts.dom.parentElement.nodeName !== "BODY"){
			width = parseInt(getStyle(_this.opts.dom.parentElement,"width"));
			height = parseInt(getStyle(_this.opts.dom.parentElement,"height"));
		}
		else{
			if(isPC){
				width = 1000;
				height = 400;
			}
			else{
				width = winWidth;
				height = winHeight;
			}
			_this.opts.dom.style.margin = "0 auto";
			_this.opts.dom.style.display = "block";
		}
		_this.opts.dom.width = width;
		_this.opts.dom.height = height;
		_this.width = width;
		_this.height = height;
		drawRect(ctx[_this.index], _this.height - _this.opts.data.height, _this.width);
		drawPeople(ctx[_this.index], _this.height - _this.opts.data.height, _this.width);
		jump(ctx[_this.index],300,200)
	},
	getStyle = function (obj, attr){
		if(obj.currentStyle){
		    return obj.currentStyle[attr];
		}
		else{
	        return getComputedStyle(obj,false)[attr];
	    }
	},
	update = function(ctx, data){

	},
	drawRect = function(ctx, leftTop, rightBottom){
		console.log(leftTop);
		ctx.rect(0, leftTop, rightBottom, leftTop);
		ctx.fill();
	},
	drawPeople = function(ctx, leftTop, rightBottom){
		ctx.rect(50, leftTop - 10, 10, 10);
		ctx.fill();
	},
	jump = function(ctx, from, to){
		animate(function(y){
			ctx.rect(50, y, 10, 10);
		}, from, to);
	},
	animate = function(fn, now, to){
		ctx.clearRect();
		var x = now + Math.floor((now - to)/20);
		if(x === 0){
			console.log(1);
			return false;
		}
		else{
			console.log(2);
			setTimeout(function(){
	        	fn(x);
	        	animate(fn, x, to);
	        }, 1000);
		}
	}
	;
	function Bfyf(opts){
		if (!(this instanceof Bfyf)) {
	        return new Bfyf(opts);
	    } else {
	        this.opts = opts;
	        this.start();
	    }
	};
	Bfyf.prototype = {
		start:start,
	};

	if ( typeof noGlobal === typeof undefined ) {
        window.Bfyf = Bfyf;
    }
    return window.Bfyf = Bfyf;
}));
var a = Bfyf({
	dom: document.getElementById("test"),
	data: data,
});