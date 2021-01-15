# LazyLoad non-reactJS
A lazyload for be use with websites.

## Instalation
```html
<script defer="defer" src="./auto-lazyload-min.js"></script>
```

## Usage
After import/call files on page, its initialize automatically.  

```html
<!-- Vitrine Vtex non-reactJS  -->
<div class="your-class has--lazyload">
	<noscript>$product.GetImageTag(2)</noscript>
</div>
```

```html
<!-- Placeholder Vtex non-reactJS -->
<div class="your-class has--lazyload">
	<noscript><vtex:contentPlaceHolder id="Main-Banner" /></noscript>
</div>
```

```html
<!-- Images -->
<img data-src="IMAGE_URL" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" class="lazy-loading">
```

```html
<!-- Iframe -->
<div class="your-class has--lazyload">
	<noscript><iframe src="IFRAME_URL"></iframe></noscript>
</div>

or

<iframe class="lazy-loading" data-src="IFRAME_URL" src="data:text/plain;charset=UTF-8,Carregando..."></iframe>
```

You can use the following classes on image tag &#60;img&#62; to custom style:

```css
/* Css */
[class*="lazy-"] {
	transition: opacity .3s linear;
}
.lazy-loading {
	opacity: .3;
}
.lazy-loaded {
	opacity: 1;
}
```

## License
Auto Lazyload is open-sourced software licensed under [MIT license](https://opensource.org/licenses/MIT).