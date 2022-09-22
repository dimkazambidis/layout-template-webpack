// Modules
import $ from 'jquery';
// import {media, mediaEvent} from './modules/media.js';
import {Media} from './modules/media.js';
import {Popup} from './modules/popup.js';
import {PopupGallery} from './modules/popup-gallery.js';

// If jQuery
// $(function() {

// });

// If Native JS
(function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    /** Usage Example Popups ******************************/

    // Base syntax
    let testPopup = new Popup();
    testPopup.init({
        afterShow() {
            console.log( 'Popup show' )
        },
        afterHide() {
            console.log( 'Popup hide' )
        }
    });

    // Example popup to start page
    // const contentElement = document.createElement( 'div' );
    // contentElement.classList.add( 'cstm-popup-content' );
    // contentElement.textContent = 'Custom Element';

    // let startPopup = new Popup();
    // setTimeout( function() {
    //     startPopup.show({
    //         contentElement: contentElement
    //     });

    //     setTimeout( function() {
    //         startPopup.hide();
    //     }, 1500);
    // }, 300);


    const gallery = new PopupGallery();
    gallery.init();

    /** Usage Example Media ******************************/

    // Initialization Media
    let media = new Media();
    media.init({
        xl: 1366
    });

    // Media from settings initialization
    function toXl() {
        console.log('To xl')
    }
    function fromXl() {
        console.log('From xl')
    }
    media.xl({
        to: toXl,
        from: fromXl
    });

    // Media from any query
    media.query( '(min-width: 768px)', {
        to: function() {
            console.log('To md');
        },
        from: function() {
            console.log('From md');
        }
    })

    // Usage media true/false
    console.log( media.xl() )
    console.log( media.query( '(min-width: 768px)' ) )
}())
