# Lazyload for VTEX
A lazyload for be use with VTEX websites.

## Instalation
```html
<script src="/arquivos/lazyload-for-vtex-min.js"></script>
```

## Usage
After import/call files on page, its initialize automatically.  

```html
<!-- Vitrine -->
<div class="your-class has--lazyload">
  <noscript>$product.GetImageTag(30)</noscript>
</div>
```

```html
<!-- Placeholder -->
<div class="your-class has--lazyload">
  <noscript><vtex:contentPlaceHolder id="Main-Banner" /></noscript>
</div>
```

```html
<!-- Images -->
<img data-src="IMAGE_URL" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" class="lazy">
```
You can use the following classes to custom style:

```css
.lazy { /* Uses when element isn't visible */ }
.loaded { /* Uses when element is loaded */ }
```

## License
Lazyload for VTEX is open-sourced software licensed under [MIT license](https://opensource.org/licenses/MIT).