# layout-template-webpack
Webpack layout template

## Installation
npm i

## Development server
npm run dev

## Production build
npm run build

## Popup module
### Location
./src/js/modules/popup.js
### Using
#### Standart
Using attributes
```html
<a
   href="#"
   data-popup
   data-popup-src="#popup"
   data-position="center">
   Text link
</a>
```
- [data-popup] - default selector for activator
- [data-popup-src] - selector for content popup element
- [data-position] - Not required (default 'center'). Position popup (center, top , left, right, bottom, top left, top right, bottom left, bottom right)
#### Options & default parameters
```JavaScript
{
    src: '', // Selector for Popup content  (String)
    activator: '[data-popup]', // Selector for Popup activator (String)
    position: 'center', // Position (center, top, left, rigt, bottom) (String)
    contentElement: null, // Element for Popup content (for example result Ajax request) (Node)
    text: '', // Text for Popup content (String)
    contentNotFound: 'Content not found', // If Conten Not Found text (String)
    beforeShow( popup ) {}, // Function before show Popup (argument popup - node popup element)
    afterShow( popup ) {}, // Function after show Popup (argument popup - node popup element)
    beforeHide( popup ) {}, // Function before hide Popup (argument popup - node popup element)
    afterHide( popup ) {} // Function after hide Popup (argument popup - node popup element)
}
```
#### Base syntax
```JavaScript
let popup = new Popup();
popup.init({
   parameters...
});
```
#### Methods
- show() - Open popup with parameters
- hide() - Hide popup with parameters (callbacks)
```JavaScript
let popup = new Popup();

activator.addEventListener( 'click', function() {
   popup.hide({
      parameters...
   });
}, false);

closer.addEventListener( 'click', function() {
   popup.hide({
      parameters...
   });
}, false);
```
## Gallery plugin
Plug-in extensions for the pop-up module for displaying galleries, (images and videos from YouTube)
### Location
./src/js/modules/popup-gallery.js
### Using
#### HTML
```html
<div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="https://youtu.be/EU4M9gWhUHQ"
      data-type="youtube">
      <img src="images/preview.png">
   </div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="images/img1.png">
      <img src="images/img1.png">
   </div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="images/img2.png">
      <img src="images/img2.png">
   </div>
</div>
```
- [data-popup-gallery] - Gallery Affiliation
- [data-popup-src] - Path to file
- [data-type] - Type content ('youtube' or not)
#### JS
The slider inside is a swiper (<https://swiperjs.com/>)
```JavaScript
const gallery = new PopupGallery();
gallery.init();
```
