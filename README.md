# LazyLoad non-reactJS
A lazyload for be use with websites.

[Demo](https://psxninja.github.io/auto-lazyload/)


## Instalation
```html
<script defer="defer" src="./auto-lazyload-min.js"></script>
```

## Usage
_After import/call files on page, its initialize automatically._

→ When front-end can't change html, most used with Vtex
```html
<div class="your-class has--lazyload">
	<noscript>html from back-end here</noscript>
</div>
```

→ Images
```html
<img class="lazy-loading" data-src="IMAGE_URL" src="data:image/gif;base64,R0lGODlhAQABAIAAAOvr6wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==">
```

→ Backgroung images
```html
<div class="your-class lazy-loading lazy-bg" data-bg="IMAGE_URL"></div>
```

→ Iframe
```html
<div class="your-class has--lazyload">
	<noscript><iframe src="IFRAME_URL"></iframe></noscript>
</div>

or

<iframe class="lazy-loading" data-src="IFRAME_URL" src="data:text/plain;charset=UTF-8,Loading..."></iframe>
```

You can use the following classes on image tag `<img class="lazy-">` to custom style:

```css
iframe[class*="lazy-"] {
	background: #ebebeb;
}
img[class*="lazy-"][src*="data:image/gif;"] {
	opacity: .1;
	transition: none;
}
img[class*="lazy-"] {
	opacity: .1;
	transition: opacity .3s ease-out;
}
img[class*="lazy-"].lazy-loaded {
	opacity: 1;
}
```


If you do need to execute again after insert some image or iframe:
```js
autoLazyload.mount()
autoLazyload.run()

/* or this to mount and execute after mount */

autoLazyload.mount(1000) /* dalay in ms */

/* also function run with dalay */

autoLazyload.run(1000) /* dalay in ms */
```

You can change default delay, look at the end of self executing function
```js
...(0); /* dalay in ms */
```


## License
Auto Lazyload is open-sourced software licensed under [MIT license](../master/LICENSE).

Made with ♥
