// Scrollbar width
function widthScrollBar() {
    const srollBar = window.innerWidth - document.body.clientWidth;
    document.documentElement.style.setProperty('--scroll-bar-width', `${srollBar}px`);
}
widthScrollBar();

window.addEventListener('resize', () => {
    widthScrollBar();
});

// Default options
const settings = {
    src: '', // Selector for Popup content
    activator: '[data-popup]', // Selector for Popup activator
    position: 'center', // Position (center, top, left, rigt, bottom)
    contentElement: null, // Element for Popup content (for example result Ajax request)
    text: '', // Text for Popup content (String)
    contentNotFound: 'Content not found', // If Conten Not Found
    closeTemplate: 'Close',
    // duration: 600,
    beforeShow( popup ) {},
    afterShow( popup ) {},
    beforeHide( popup ) {},
    afterHide( popup ) {}
}

// Array with Active popups
let activePopups = [];

export class Popup {
    constructor( options = {} ) {
        this.options = options;
        this.options.__proto__ = settings;
    }

    init( params = {} ) {
        const context = this;

        let options = Object.assign( {}, params );
        options.__proto__ = settings;
        context.options = options;

        const activators = document.querySelectorAll( options.activator );
        const contentElements = context.getContentElements();

        // Hide content elements
        context.hideContentElements( contentElements );

        // Handling activators
        if ( activators.length ) {
            activators.forEach( activator => {
                let showOptions = {};

                // Get src
                const dataSrc = activator.getAttribute( 'data-popup-src' );
                showOptions.src = ( dataSrc ) ? dataSrc : options.src;
                
                // Get position
                const dataPosition = activator.getAttribute( 'data-popup-pos' );
                showOptions.position = ( dataPosition ) ? dataPosition : options.position;

                // Click on Activator
                activator.addEventListener( 'click', function(e) {
                    e.preventDefault();

                    context.show( showOptions );
                }, false );
            })
        }
    }

    getInlineContent( options ) {
        const contentInline = ( options.text ) ? options.text : options.contentNotFound;
        const contentElement = document.createElement( 'div' );

        contentElement.classList.add( 'cstm-popup-content' );
        contentElement.textContent = contentInline;

        return contentElement;
    }

    getContentElements() {
        const options = this.options;
        const activators = document.querySelectorAll( options.activator );
        let contentElements = [];

        if ( activators.length ) { // Elements in attribute data-popup-src
            activators.forEach( activator => {
                const src = activator.getAttribute( 'data-popup-src' );
                const element = document.querySelector( src );

                if ( element && contentElements.indexOf( element ) === -1 ) {
                    contentElements.push( element );
                }
            })
        }

        if ( options.src ) { // Element in options src
            const optionSrc = document.querySelector( options.src );

            if ( optionSrc && contentElements.indexOf( optionSrc ) === -1 ) {
                contentElements.push( optionSrc );
            }
        }

        return contentElements;
    }

    hideContentElements( elements ) {
        elements.forEach( element => {
            element.style.display = 'none';
            element.classList.add( 'cstm-popup-content' );
        });
    }

    hideListener( e ) {
        e.preventDefault();

        const popup = e.currentTarget.popup;
        const context = e.currentTarget.context;

        context.hide( {}, popup );
    }

    popupConsruction( content, options ) {
        const context = this;
        const templateElement = document.createElement( 'template' );
        const template = '<div class="cstm-popup ' + options.position + '">' +
                            '<div class="cstm-popup-main">' +
                                '<div class="cstm-popup-darker" data-popup-close></div>' +
                            '</div>' +
                        '</div>';

        templateElement.innerHTML = template;
        const popup = templateElement.content.firstChild;

        let placeholder = '';
        const contentElements = context.getContentElements();
        if ( contentElements.indexOf( content ) !== -1 ) {
            placeholder = document.createElement( 'div' );
            placeholder.classList.add( 'cstm-popup-placeholder' );
            content.before( placeholder );
        }

        popup.content = content;
        popup.placeholder = placeholder;
        activePopups.push( popup );

        const main = popup.querySelector( '.cstm-popup-main' );
        main.append( content );
        content.style.display = '';

        const closers = popup.querySelectorAll( '[data-popup-close]' );

        if ( closers.length ) {
            closers.forEach( closer => {
                closer.popup = popup;
                closer.context = context;
                closer.addEventListener( 'click', context.hideListener, false);
            });
        }

        return popup;
    }
 
    popupDeconsruction( popup ) {
        const context = this;
        const content = popup.content;
        const placeholder = popup.placeholder;

        // Content Element return to its place
        if ( placeholder ) {
            placeholder.before( content );
            content.style.display = 'none';
            placeholder.remove();
        }

        // Remove Listener on Click event
        const closers = popup.querySelectorAll( '[data-popup-close]' );

        if ( closers.length ) {
            closers.forEach( closer => {
                closer.popup = popup;
                closer.removeEventListener( 'click', context.hideListener, false);
            });
        }
    }

    show( params = {} ) {
        let options = Object.assign( {}, params );
        options.__proto__ = this.options;
        
        // Blocking scroll
        const srollBar = window.innerWidth - document.body.clientWidth;
        if ( srollBar ) {
            document.body.classList.add( '_cstm-popup-padding' );
        }

        if ( !activePopups.length ) {
            document.body.classList.add( '_cstm-popup-on' );
        }

        // Get content
        const contentElement = ( options.src ) ? document.querySelector( options.src ) : options.contentElement;
        const content = ( contentElement ) ? contentElement : this.getInlineContent( options );
        const popup = this.popupConsruction( content, options );
        popup.options = options;

        // Show popup
        options.beforeShow( popup );
        document.body.append( popup );

        setTimeout( function() {
            popup.classList.add( '_visible' );

            setTimeout( function() {
                options.afterShow( popup );
            }, 450);
        }, 50);
    }

    hide( params = {}, popup = activePopups[ activePopups.length - 1 ] ) {
        let context = this;
        let options = Object.assign( {}, params );
        options.__proto__ = this.options;

        options.beforeHide( popup );
        popup.classList.remove( '_visible' );
        
        setTimeout( function() {
            const closedPopup = activePopups.filter( item => item === popup );
            context.popupDeconsruction( closedPopup[0] );

            activePopups = activePopups.filter( item => item !== popup );
            popup.remove();

            options.afterHide( popup );

            if ( !activePopups.length ) {
                document.body.classList.remove( '_cstm-popup-on', '_cstm-popup-padding' );
                widthScrollBar();
            }
        }, 450)
    }
}
let closePopup = new Popup();

document.addEventListener( 'keydown', function(e) {
    if ( e.code === 'Escape' && activePopups.length > 0 ) {
        const popup = activePopups[ activePopups.length - 1 ];
        const options = popup.options;

        closePopup.hide( options, popup );
    }
});