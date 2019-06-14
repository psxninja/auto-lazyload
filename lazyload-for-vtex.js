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
		console.log('img has loaded');
		elem.removeEventListener('onload', onloadImg);
	};

	console.time('replace-noscript');
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
	};
	console.timeEnd('replace-noscript');

	if('IntersectionObserver' in window){
		var elems = document.querySelectorAll(".lazy");
		var options = {};
		var observer = new IntersectionObserver(function(entries,observer){
			entries.forEach(function(entry){
				if(!entry.isIntersecting)return;
				observer.unobserve(entry.target);
				entry.target.onload = onloadImg(entry.target);
				entry.target.src = entry.target.dataset.src;
				console.log('observer img loaded');
			});
		},options);
		elems.forEach(function(elem){
			observer.observe(elem);
		});
	}else{
		var imgs = document.querySelectorAll(".lazy");
		var loadlazy = function(){
			if(!imgs.length)return;
			imgs = document.querySelectorAll(".lazy");
			imgs.forEach(function(elem){
				if (elem.classList.contains("loaded")) return;
				var rect = elem.getBoundingClientRect();
				var visible = (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || screen.height) && rect.left <= (window.innerWidth || screen.width));
				if(visible){
					elem.src = elem.dataset.src;
					elem.onload = onloadImg(elem);
				}
			});
		};
		window.onload = loadlazy;
		['transitionend', 'animationend', 'webkitAnimationEnd', 'scroll', 'resize'].forEach(function(name){
			document.addEventListener(name, loadlazy, true);
		});
		document.addEventListener('click', function(){setTimeout(loadlazy,550)}, true);
	}
})();