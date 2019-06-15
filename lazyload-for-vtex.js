(function(){
	'use strict';
	var elems = document.querySelectorAll('.has--lazyload');
	var elemsInd = elems.length;
	var regImg = new RegExp(/<img.*?>/gi);
	var regIframe = new RegExp(/<iframe.*?>/gi);
	var regSrc = new RegExp(/src="(.*?)"/gi);
	var repImg = 'data-src="$1" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" class="lazy"';
	var repIframe = 'data-src="$1" src="data:text/plain;charset=UTF-8,Carregando..." class="lazy"';
	var onloadImg = function(elem) {
		elem.classList.remove('lazy');
		elem.classList.add('loaded');
		elem.removeEventListener('onload', onloadImg);
	};
	var execLazy = function(elems, elemsInd){
		console.time('replace-noscript');
		var elems = elems;
		for(var z = 0; z<elemsInd; z++){
			var _content = elems[z].querySelector('noscript').textContent;
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
		console.timeEnd('replace-noscript');
		if('IntersectionObserver' in window){
			var elems = document.querySelectorAll(".lazy");
			var observer = new IntersectionObserver(function(entries,observer){
				for(var z = 0, v = entries.length; z<v; z++){
					if(!entries[z].isIntersecting)return;
					observer.unobserve(entries[z].target);
					entries[z].target.onload = onloadImg(entries[z].target);
					entries[z].target.src = entries[z].target.dataset.src;
				}
			});
			for(var x = 0, c = elems.length; x<c; x++){
				observer.observe(elems[x]);
			}
		}else{
			var imgs = document.querySelectorAll(".lazy");
			var loadlazy = function(){
				if(!imgs.length)return;
				imgs = document.querySelectorAll(".lazy");
				for(var z = 0, v = imgs.length; z<v; z++){
					if (imgs[z].classList.contains("loaded")) return;
					var rect = imgs[z].getBoundingClientRect();
					var visible = (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || screen.height) && rect.left <= (window.innerWidth || screen.width));
					if(visible){
						imgs[z].src = imgs[z].dataset.src;
						imgs[z].onload = onloadImg(imgs[z]);
					}
				}
			};
			window.onload = loadlazy;
			var events = ['transitionend', 'animationend', 'webkitAnimationEnd', 'scroll', 'resize'];
			for(var x = 0, c = events.length; x<c; x++){
				document.addEventListener(events[x], loadlazy, true);
			}
			document.addEventListener('click', function(){setTimeout(loadlazy,550)}, true);
		}
	};
	var wait = false;
	var throttle = function(callback, limit){
		if (!wait) {
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit);
			callback();
		}
	}
	execLazy(elems,elemsInd);
	document.addEventListener('DOMNodeInserted', function(){
		elems = document.querySelectorAll('.has--lazyload');
		elemsInd = elems.length;
		throttle(function(){ execLazy(elems,elemsInd); },1000);
	}, true);
	document.addEventListener('DOMAttrModified', function(){
		elems = document.querySelectorAll('.has--lazyload');
		elemsInd = elems.length;
		throttle(function(){ execLazy(elems,elemsInd); },1000);
	}, true);
})();