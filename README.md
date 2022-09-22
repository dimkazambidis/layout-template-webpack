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
const contentElement = document.createElement( 'div' );
contentElement.classList.add( 'cstm-popup-content' );
contentElement.textContent = 'Custom Element';

let startPopup = new Popup();
setTimeout( function() {
   startPopup.show({
      contentElement: contentElement
   });

   setTimeout( function() {
      startPopup.hide();
   }, 1500);
}, 300);
```
