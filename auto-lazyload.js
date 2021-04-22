/*!
 * Auto Lazyload v2.0
 * https://psxninja.github.io
 *
 * Copyright psxninja
 * Released under the MIT license
 * https://github.com/psxninja/auto-lazyload/blob/master/LICENSE
 *
 * Date: 2019-07-20T22:49Z
 */
(function(win, doc){
	'use strict';
	var regImg = /<img.*?>/gi
	,regIframe = /<iframe.*?>/gi
	,regSrc = /src="(.*?)"/gi
	,repImg = 'data-src="$1" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="'
	,repIframe = 'data-src="$1" src="data:text/plain;charset=UTF-8,Carregando..."'
	,eventsPolyfill = [
		'DOMNodeInserted',
		'transitionend',
		'animationend',
		'webkitAnimationEnd',
		'resize',
		/* 'DOMAttrModified' */
	]
	,windowHeight = (window.innerHeight || doc.documentElement.clientHeight)
	,windowWidth = (window.innerWidth || doc.documentElement.clientWidth)
	,execLoad = null
	,mountLoad = null
	,onloadImg = function(img) {
		img.className = img.className.replace('lazy-loading', 'lazy-loaded')
		img.removeEventListener('onload', onloadImg)
	}
	,throttle = function(callback, limit) {
		if (execLoad !== null) clearTimeout(execLoad)
		execLoad = win.setTimeout(function() {
			callback()
			execLoad = null
		}, (limit || 550))
	}
	function mountLazy() {
		var elems = doc.querySelectorAll('.has--lazyload')
		if (elems.length === 0 || mountLoad !== null) return
		mountLoad = win.setTimeout(function() {
			mountLoad = null
		}, 550)
		for (var z = 0, y = elems.length; z < y; z++) {
			var div = doc.createElement('div')
			var html = elems[z].querySelector('noscript')
			var getToLazy = null
			if (html === null || html.length === 0) continue
			html = html.textContent
			if (regImg.test(html)) {
				html = html.replace(regImg, function(str) {
					return str.replace(regSrc, repImg)
				});
				div.innerHTML = html
				getToLazy = div.getElementsByTagName('img')
			}
			if (regIframe.test(html)) {
				html = html.replace(regIframe, function(str) {
					return str.replace(regSrc, repIframe)
				});
				div.innerHTML = html
				getToLazy = div.getElementsByTagName('iframe')
			}
			for (var q = 0, t = getToLazy.length; q < t; q++) {
				getToLazy[q].className += ' lazy-loading'
			}
			elems[z].innerHTML = div.innerHTML
			elems[z].className = elems[z].className.replace('has--lazyload', '')
			html = undefined
			div = undefined
			getToLazy = undefined
		}
		elems = undefined
	}
	if ('IntersectionObserver' in window) {
		function execLazy(){
			var lazy = doc.querySelectorAll('.lazy-loading');
			var observer = new IntersectionObserver(function(entries, observer) {
				for (var z = 0, v = entries.length; z < v; z++) {
					if (entries[z].isIntersecting === false) continue
					if (entries[z].target.dataset.bg) {
						entries[z].target.style.backgroundImage
							= 'url(' + entries[z].target.dataset.bg + ')'
						onloadImg(entries[z].target)
					}
					if (entries[z].target.dataset.src) {
						entries[z].target.onload = onloadImg(entries[z].target)
						entries[z].target.src = entries[z].target.dataset.src
					}
					observer.unobserve(entries[z].target)
				}
			})
			for (var x = 0, c = lazy.length; x < c; x++) {
				observer.observe(lazy[x]);
			}
			lazy = undefined
		}
		mountLazy()
		doc.addEventListener('DOMContentLoaded', function() {
			execLazy()
			doc.addEventListener('DOMNodeInserted', function(el) {
				if (el.target.className === undefined) return
				if (el.target.className.indexOf('has--lazyload') === -1) return
				mountLazy()
				throttle(function() {
					execLazy()
				})
			}, true);
		}, true);
	} else {
		function execLazy() {
			var lazy = doc.querySelectorAll('.lazy-loading');
			if (lazy.length === 0) return
			for (var z = 0, v = lazy.length; z < v; z++) {
				if (lazy[z].className.indexOf('lazy-loading') === -1) continue
				var rect = lazy[z].getBoundingClientRect()
				if (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.top <= windowHeight &&
					rect.right <= windowWidth
				) {
					if (lazy[z].dataset.bg) {
						lazy[z].style.backgroundImage
							= 'url(' + lazy[z].dataset.bg + ')'
						onloadImg(lazy[z])
					}
					if (lazy[z].dataset.src) {
						lazy[z].onload = onloadImg(lazy[z])
						lazy[z].src = lazy[z].dataset.src
					}
				}
				rect = undefined
			}
			lazy = null
		}
		mountLazy()
		doc.addEventListener('scroll', function() {
			throttle(function() {
				mountLazy()
				execLazy()
			})
		}, true)
		doc.addEventListener('DOMContentLoaded', function() {
			for(var x = 0, c = eventsPolyfill.length; x < c; x++) {
				doc.addEventListener(eventsPolyfill[x], function(el) {
					if (el.target.className === undefined) return
					if (el.target.className.indexOf('has--lazyload') === -1) return
					mountLazy()
					throttle(function() {
						execLazy()
					})
				}, true)
			}
		}, true);
	}
})(window, document);