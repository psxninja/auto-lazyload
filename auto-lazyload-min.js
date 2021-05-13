/*!
 * Auto Lazyload v3.1.0
 * https://psxninja.github.io
 *
 * Copyright psxninja
 * Released under the MIT license
 * https://github.com/psxninja/auto-lazyload/blob/master/LICENSE
 *
 * Date: 2019-07-20T22:49Z
 */
(function(a){'use strict';var b=/<img.*?>/gi,c=/<iframe.*?>/gi,d=/src="(.*?)"/gi,e=["transitionend","animationend","webkitAnimationEnd","resize","scroll"],f=window.innerHeight||document.documentumentElement.clientHeight,g=window.innerWidth||document.documentumentElement.clientWidth,h=null,i=null,j=function(a,b){setTimeout(function(){a.className=a.className.replace("lazy-loading","lazy-loaded")},b||0),a.removeEventListener("onload",j)},k=function(a,b){null!==h&&clearTimeout(h),h=window.setTimeout(function(){a(),h=null},b||550)};window.autoLazyload={},window.autoLazyload.run=function(a){for(var b=document.querySelectorAll(".lazy-loading"),d=new IntersectionObserver(function(b,c){for(var d=0,e=b.length;d<e;d++)!1!==b[d].isIntersecting&&(b[d].target.dataset.bg&&(b[d].target.style.backgroundImage="url("+b[d].target.dataset.bg+")",j(b[d].target,a)),b[d].target.dataset.src&&(b[d].target.onload=j(b[d].target,a),b[d].target.src=b[d].target.dataset.src),c.unobserve(b[d].target))}),e=0,f=b.length;e<f;e++)d.observe(b[e]);d=b=void 0},window.autoLazyload.mount=function(a){var e=document.querySelectorAll(".has--lazyload");if(0!==e.length&&null===i){i=window.setTimeout(function(){i=null},550);for(var f=0,g=e.length;f<g;f++){var h=document.createElement("div"),j=e[f].querySelector("noscript"),k=null;if(null!==j&&0!==j.length){j=j.textContent,b.test(j)&&(j=j.replace(b,function(a){return a.replace(d,"data-src=\"$1\" src=\"data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=\"")}),h.innerHTML=j,k=h.getElementsByTagName("img")),c.test(j)&&(j=j.replace(c,function(a){return a.replace(d,"data-src=\"$1\" src=\"data:text/plain;charset=UTF-8,Carregando...\"")}),h.innerHTML=j,k=h.getElementsByTagName("iframe"));for(var l=0,m=k.length;l<m;l++)k[l].className+=" lazy-loading";e[f].innerHTML=h.innerHTML,e[f].className=e[f].className.replace("has--lazyload",""),j=h=k=void 0}}e=void 0,a&&autoLazyload.run(a)}},"IntersectionObserver"in window?(autoLazyload.mount(),document.addEventListener("DOMContentLoaded",function(){autoLazyload.run(a)},!0)):(window.autoLazyload.run=function(a){var b=document.querySelectorAll(".lazy-loading");if(0!==b.length){for(var c=0,d=b.length;c<d;c++)if(-1!==b[c].className.indexOf("lazy-loading")){var e=b[c].getBoundingClientRect();0<=e.top&&0<=e.left&&e.top<=f&&e.right<=g&&(b[c].dataset.bg&&(b[c].style.backgroundImage="url("+b[c].dataset.bg+")",j(b[c],a)),b[c].dataset.src&&(b[c].onload=j(b[c],a),b[c].src=b[c].dataset.src)),e=void 0}b=void 0}},autoLazyload.mount(),document.addEventListener("DOMContentLoaded",function(){autoLazyload.run(a);for(var b=0,d=e.length;b<d;b++)document.addEventListener(e[b],function(a){void 0===a.target.className||-1===a.target.className.indexOf("has--lazyload")||(autoLazyload.mount(),k(function(){autoLazyload.run()}))},!0)},!0))})(0);