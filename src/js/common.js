// Modules
import $ from 'jquery';
import {media, mediaEvent} from './modules/media.js';
import {Popup} from './modules/popup.js';

// If jQuery
// $(function() {

// });

// If Native JS
(function() {

    /** Standart Comment ******************************/

    // Usage Example Popups
    let testPopup = new Popup();
    testPopup.init({
        afterShow() {
            console.log( 'Popup show' )
        },
        afterHide() {
            console.log( 'Popup hide' )
        }
    });

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

    // Usage Example Media
    mediaEvent( 'lg', {
        in: function() {
            console.log( 'min-width: 1024px, >=1024px -', media.lg )
        },
        out: function() {
            console.log( 'max-width: 1023px, >=1024px -', media.lg )
        }
    });

}())
