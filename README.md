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
####Standart
Using attributes
```html
<a
   href="#"
   data-popup // Activator default
   data-popup-src="#popup" // Selector for content element
   data-position="center"> // Not required (default 'center'). Position popup (center, top , left, right, bottom, top left, top right, bottom left, bottom right)
  Text link
</a>
```
#### Options
```JavaScript
{
    src: '', // Selector for Popup content
    activator: '[data-popup]', // Selector for Popup activator
    position: 'center', // Position (center, top, left, rigt, bottom)
    contentElement: null, // Element for Popup content (for example result Ajax request)
    text: '', // Text for Popup content (String)
    contentNotFound: 'Content not found', // If Conten Not Found text
    beforeShow( popup ) {},
    afterShow( popup ) {},
    beforeHide( popup ) {},
    afterHide( popup ) {}
}
```
