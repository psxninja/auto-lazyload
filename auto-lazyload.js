/*!
 * Auto Lazyload v1.0
 * https://psxninja.github.io
 *
 * Copyright Pablo Santos
 * Released under the MIT license
 * https://github.com/psxninja/lazyload--vtex/blob/master/LICENSE
 *
 * Date: 2019-07-20T22:49Z
 */
(function(){
	'use strict';
	var regImg = new RegExp(/<img.*?>/gi);
	var regIframe = new RegExp(/<iframe.*?>/gi);
	var regSrc = new RegExp(/src="(.*?)"/gi);
	var repImg = 'data-src="$1" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" class="lazy-loading"';
	var repIframe = 'data-src="$1" src="data:text/plain;charset=UTF-8,Carregando..." class="lazy-loading"';
	var eventsObserver = ['DOMNodeInserted', 'DOMAttrModified', 'DOMContentLoaded'];
	var eventsPolyfill = ['scroll', 'resize', 'transitionend', 'animationend', 'webkitAnimationEnd'].concat(eventsObserver);
	var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
	var execLoad, mountLoad = null;
	var onloadImg = function(elem) {
		elem.classList.remove('lazy-loading');
		elem.classList.add('lazy-loaded');
		elem.removeEventListener('onload', onloadImg);
	};
	var throttle = function(callback, limit){
		if(execLoad!==null)clearTimeout(execLoad);
		execLoad = setTimeout(function(){ callback() },(limit||550));
	}
	var mountLazy = function(){
		var elems = document.querySelectorAll('.has--lazyload');
		if(!elems.length || mountLoad!==null)return;
		mountLoad = setTimeout(function(){ mountLoad = null },500);
		for(var z = 0, y = elems.length; z<y; z++){
			var _content = elems[z].querySelector('noscript');
			_content = _content.textContent;
			if(regImg.test(_content)){
				_content = _content.replace(regImg, function(str){
					return str.replace(regSrc, repImg);
				});
			}
			if(regIframe.test(_content)){
				_content = _content.replace(regIframe, function(str){
					return str.replace(regSrc, repIframe);
				});
			}
			elems[z].innerHTML = _content;
			elems[z].classList.remove('has--lazyload');
		}
	};
	if('IntersectionObserver' in window){
		var execLazy = function(){
			var lazy = document.querySelectorAll('.lazy-loading');
			var observer = new IntersectionObserver(function(entries, observer){
				for(var z = 0, v = entries.length; z<v; z++){
					if(!entries[z].isIntersecting)continue;
					entries[z].target.onload = onloadImg(entries[z].target);
					entries[z].target.src = entries[z].target.dataset.src;
					observer.unobserve(entries[z].target);
				}
			});
			for(var x = 0, c = lazy.length; x<c; x++){
				observer.observe(lazy[x]);
			}
		}
		for(var x = 0, c = eventsObserver.length; x<c; x++){
			document.addEventListener(eventsObserver[x], function(){ mountLazy(); throttle( function(){ execLazy() }); }, true);
		}
	}else{
		var execLazy = function(){
			var lazy = document.querySelectorAll(".lazy-loading");
			if(!lazy.length)return;
			for(var z = 0, v = lazy.length; z<v; z++){
				if(lazy[z].classList.contains("lazy-loaded"))continue;
				var rect = lazy[z].getBoundingClientRect();
				if(rect.top >= 0 && rect.left >= 0 && rect.top <= windowHeight && rect.right <= windowWidth){
					lazy[z].src = lazy[z].dataset.src;
					lazy[z].onload = onloadImg(lazy[z]);
				}
			}
		};
		for(var x = 0, c = eventsPolyfill.length; x<c; x++){
			document.addEventListener(eventsPolyfill[x], function(){ mountLazy(); throttle(function(){ execLazy() },200) }, true);
		}
		document.addEventListener('mouseup', function(){ mountLazy(); throttle(function(){ execLazy() }) }, true);
	}
})();