# LazyLoad non-reactJS
A lazyload for be use with websites.

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
<img data-src="IMAGE_URL" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" class="lazy-loading">
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

<iframe class="lazy-loading" data-src="IFRAME_URL" src="data:text/plain;charset=UTF-8,Carregando..."></iframe>
```

You can use the following classes on image tag `<img class="lazy-">` to custom style:

```css
[class*="lazy-"] {
    opacity: .1;
	transition: opacity .2s ease-out;
}
.lazy-loading {
	opacity: .1;
}
.lazy-loaded {
	opacity: 1;
}
.lazy-bg {
    opacity: 1;
}
```


## License
Auto Lazyload is open-sourced software licensed under [MIT license](../master/LICENSE).

Made with ♥
