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
#### Options
```JavaScript
{
    src: '', // Selector for Popup content  (String)
    activator: '[data-popup]', // Selector for Popup activator (String)
    position: 'center', // Position (center, top, left, rigt, bottom) (String)
    contentElement: null, // Element for Popup content (for example result Ajax request) (Node)
    text: '', // Text for Popup content (String)
    contentNotFound: 'Content not found', // If Conten Not Found text (String)
    beforeShow( popup ) {}, // Function before show Popup
    afterShow( popup ) {}, // Function after show Popup
    beforeHide( popup ) {}, // Function before hide Popup
    afterHide( popup ) {} // Function after hide Popup
}
```
