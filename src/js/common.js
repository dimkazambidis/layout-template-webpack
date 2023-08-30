// Modules
// import $ from 'jquery';
import {Forms} from './modules/forms.js';
import {Media} from './modules/media.js';
import {Popup} from './modules/popup.js';
import {PopupGallery} from './modules/popup-gallery.js';
import {Tabs} from './modules/tabs.js';
import {Accordion} from './modules/accordion.js';

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
    window.testPopup = new Popup();
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

    // const startPopup = new Popup();
    // setTimeout( function() {
    //     startPopup.show({
    //         contentElement: contentElement
    //     });

    //     setTimeout( function() {
    //         startPopup.hide();
    //     }, 1500);
    // }, 300);

    // Example Gallery plugin for Popup module
    window.gallery = new PopupGallery();
    gallery.init();

    /** Usage Example Media ******************************/

    // Initialization Media
    const media = new Media();
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
    console.log( 'media-xl: ', media.xl() )
    console.log( '@media (min-width: 768px): ', media.query( '(min-width: 768px)' ) )

    // For test tabs.reInit();

    // setTimeout( function() {
    //     const templateElement = document.createElement( 'template' );
    //     const template = '<section style="padding-top: 3rem"><div class="container"><div class="cstm-tabs" data-tabs-accordion="768"><div class="cstm-tabs-nav"><div class="row"><div class="col-md-4"><a class="cstm-tabs__btn _current" href="#">Tab 1</a></div><div class="col-md-4"><a class="cstm-tabs__btn" href="#">Tab 2</a></div><div class="col-md-4"><a class="cstm-tabs__btn" href="#">Tab 3</a></div></div></div><div class="cstm-tabs-body"><div class="cstm-tabs__content"><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Venenatis lectus magna fringilla urna porttitor rhoncus. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Vel orci porta non pulvinar neque. Tempus quam pellentesque nec nam aliquam sem et tortor. Sit amet dictum sit amet justo. Nunc faucibus a pellentesque sit amet porttitor. Et odio pellentesque diam volutpat commodo sed egestas. Quisque egestas diam in arcu cursus euismod quis viverra. Egestas purus viverra accumsan in nisl. Faucibus turpis in eu mi. Pellentesque habitant morbi tristique senectus et netus et malesuada. Et magnis dis parturient montes nascetur ridiculus. Lacinia at quis risus sed vulputate. Enim ut sem viverra aliquet eget. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus.</div></div><div class="cstm-tabs__content"><div>Eu lobortis elementum nibh tellus molestie nunc. Posuere ac ut consequat semper viverra nam libero justo laoreet. Sem viverra aliquet eget sit amet tellus cras. Arcu risus quis varius quam quisque id. Aliquet porttitor lacus luctus accumsan tortor posuere. Sed vulputate mi sit amet mauris. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Quam pellentesque nec nam aliquam sem et tortor. Sem integer vitae justo eget magna fermentum iaculis. Integer enim neque volutpat ac tincidunt vitae. Pellentesque sit amet porttitor eget. Urna id volutpat lacus laoreet. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Venenatis cras sed felis eget.</div><div class="cstm-tabs"><div class="cstm-tabs-nav"><div class="row"><div class="col-4"><a class="cstm-tabs__btn _current" href="#">Subtab 1</a></div><div class="col-4"><a class="cstm-tabs__btn" href="#">Subtab 2</a></div><div class="col-4"><a class="cstm-tabs__btn" href="#">Subtab 3</a></div></div></div><div class="cstm-tabs-body"><div class="cstm-tabs__content"><div>Content Subtab 1</div></div><div class="cstm-tabs__content"><div>Content Subtab 2</div></div><div class="cstm-tabs__content"><div>Content Subtab 3</div></div></div></div></div><div class="cstm-tabs__content"><div>Porta nibh venenatis cras sed felis eget. Phasellus egestas tellus rutrum tellus pellentesque. Pharetra convallis posuere morbi leo urna molestie at elementum. Amet porttitor eget dolor morbi non arcu. Faucibus interdum posuere lorem ipsum. Eu mi bibendum neque egestas congue quisque. Orci dapibus ultrices in iaculis. Tristique et egestas quis ipsum suspendisse ultrices gravida. Mattis nunc sed blandit libero volutpat sed. Velit scelerisque in dictum non. Ipsum consequat nisl vel pretium. Nullam vehicula ipsum a arcu cursus vitae.</div></div></div></div></div></section>'
    //     templateElement.innerHTML = template;
    //     const aaa = templateElement.content.firstChild;
        
    //     document.querySelector('#tabs').after( aaa )
    // }, 1000)
    
    // For test accordion.reInit();
    
    // setTimeout( function() {
    //     const templateElement = document.createElement( 'template' );
    //     const template = '<div class="cstm-accordion" style="padding-top: 1rem" data-accordion-toggle=""><div class="cstm-accordion-list"><div class="cstm-accordion-item _active"><div class="cstm-accordion-item__header"> <b>Accordion item 1</b></div><div class="cstm-accordion-item__content"><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Venenatis lectus magna fringilla urna porttitor rhoncus. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Vel orci porta non pulvinar neque. Tempus quam pellentesque nec nam aliquam sem et tortor. Sit amet dictum sit amet justo. Nunc faucibus a pellentesque sit amet porttitor. Et odio pellentesque diam volutpat commodo sed egestas. Quisque egestas diam in arcu cursus euismod quis viverra. Egestas purus viverra accumsan in nisl. Faucibus turpis in eu mi. Pellentesque habitant morbi tristique senectus et netus et malesuada. Et magnis dis parturient montes nascetur ridiculus. Lacinia at quis risus sed vulputate. Enim ut sem viverra aliquet eget. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus.</div></div></div><div class="cstm-accordion-item" style="padding-top: 1rem"><div class="cstm-accordion-item__header"> <b>Accordion item 2</b></div><div class="cstm-accordion-item__content"><div>Eu lobortis elementum nibh tellus molestie nunc. Posuere ac ut consequat semper viverra nam libero justo laoreet. Sem viverra aliquet eget sit amet tellus cras. Arcu risus quis varius quam quisque id. Aliquet porttitor lacus luctus accumsan tortor posuere. Sed vulputate mi sit amet mauris. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Quam pellentesque nec nam aliquam sem et tortor. Sem integer vitae justo eget magna fermentum iaculis. Integer enim neque volutpat ac tincidunt vitae. Pellentesque sit amet porttitor eget. Urna id volutpat lacus laoreet. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Venenatis cras sed felis eget.</div><div class="cstm-accordion"><div class="cstm-accordion-list"><div class="cstm-accordion-item" style="padding-top: 1rem"><div class="cstm-accordion-item__header"> <b>SubAccordion item 1</b></div><div class="cstm-accordion-item__content"><div>Content SubAccordion 1</div></div></div><div class="cstm-accordion-item" style="padding-top: 1rem"><div class="cstm-accordion-item__header"> <b>SubAccordion item 2</b></div><div class="cstm-accordion-item__content"><div>Content SubAccordion 2</div></div></div><div class="cstm-accordion-item" style="padding-top: 1rem"><div class="cstm-accordion-item__header"> <b>SubAccordion item 3</b></div><div class="cstm-accordion-item__content"><div>Content SubAccordion 3</div></div></div></div></div></div></div><div class="cstm-accordion-item" style="padding-top: 1rem"><div class="cstm-accordion-item__header"> <b>Accordion item 3</b></div><div class="cstm-accordion-item__content"><div>Porta nibh venenatis cras sed felis eget. Phasellus egestas tellus rutrum tellus pellentesque. Pharetra convallis posuere morbi leo urna molestie at elementum. Amet porttitor eget dolor morbi non arcu. Faucibus interdum posuere lorem ipsum. Eu mi bibendum neque egestas congue quisque. Orci dapibus ultrices in iaculis. Tristique et egestas quis ipsum suspendisse ultrices gravida. Mattis nunc sed blandit libero volutpat sed. Velit scelerisque in dictum non. Ipsum consequat nisl vel pretium. Nullam vehicula ipsum a arcu cursus vitae.</div></div></div></div></div>'
    //     templateElement.innerHTML = template;
    //     const aaa = templateElement.content.firstChild;
        
    //     document.querySelector('#accordion').after( aaa )
    // }, 1000)

    // Custom Selects

    // const selectElement = document.querySelector( selector )
    // select.reInit( selectElement )
    // select.init( selectElement )
    // select.update( selectElement )
    // select.destroy( selectElement )
}())
