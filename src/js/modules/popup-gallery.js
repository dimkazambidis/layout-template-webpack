import {Popup} from '../modules/popup.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export class PopupGallery {
    init() {
        const context = this;
        const activators = document.querySelectorAll( '[data-popup-gallery]' );
        activators.forEach( activator => {
            activator.addEventListener( 'click', function(e) {
                e.preventDefault();

                const gallery = activator.getAttribute( 'data-popup-gallery' );
                const galleryActivators = document.querySelectorAll( `[data-popup-gallery=${gallery}]` );
                const activeIndex = Array.from( galleryActivators ).indexOf( activator );

                const content = context.contentConsruction( galleryActivators );
                const slider = content.querySelector( '.cstm-popup-gallery' );
                const slides = content.querySelectorAll( '.swiper-slide' );
                const next = content.querySelector( '.swiper-button-next' );
                const prev = content.querySelector( '.swiper-button-prev' );
                const pagination = content.querySelector( '.swiper-pagination' );

                let swiper;
                let popup = new Popup();

                // Flipping slider using "left" and "right" keys
                function keyDownEvent(e) {
                    if ( e.code === 'ArrowRight' ) {
                        swiper.slideNext();
                    }
                    if ( e.code === 'ArrowLeft' ) {
                        swiper.slidePrev();
                    }
                }

                // Show Popup
                popup.show({
                    activator: '',
                    position: 'center',
                    contentElement: content,
                    beforeShow() {
                        swiper = new Swiper( slider, {
                            initialSlide: activeIndex,
                            navigation: {
                                nextEl: next,
                                prevEl: prev,
                            },
                            pagination: {
                                el: pagination,
                                clickable: true,
                            }
                        });
                        document.addEventListener( 'keydown', keyDownEvent, false );
                    }
                });

                // Hide popup
                slides.forEach( slide => {
                    slide.addEventListener( 'click', function() {
                        popup.hide({
                            afterHide() {
                                swiper = null;
                                popup = null;
                                document.removeEventListener( 'keydown', keyDownEvent, false );
                            }
                        })
                    });
                })
            })
        })
    }

    contentConsruction( activators ) {
        // Carcas for content
        const tmplContentElement = document.createElement( 'template' );
        const tmplContent = '<div class="cstm-popup-content _gallery">' +
                                '<div class="swiper cstm-popup-gallery">' +
                                    '<div class="swiper-wrapper"></div>' +
                                    '<div class="swiper-pagination"></div>' +
                                    '<div class="swiper-button-prev"></div>' +
                                    '<div class="swiper-button-next"></div>' +
                                '</div>' +
                            '</div>';

        tmplContentElement.innerHTML = tmplContent;
        const content = tmplContentElement.content.firstChild;
        const wrapper = content.querySelector( '.swiper-wrapper' );

        // Carcas for Slides
        activators.forEach(  galleryActivator => {
            const type = galleryActivator.getAttribute( 'data-type' );
            const src = galleryActivator.getAttribute( 'data-popup-src' );
            const tmplSlideElement = document.createElement( 'template' );

            let tmplSlide;
            // If content Youtube video
            if ( type === 'youtube' ) {
                let videoID = src.split('/');
                videoID = videoID[ videoID.length - 1 ]
                tmplSlide = '<div class="swiper-slide">' +
                                '<div class="cstm-popup-slide-content">' +
                                    '<div class="cstm-popup-slide-box">' +
                                        '<div class="cstm-popup-slide-video">' +
                                            '<iframe ' +
                                                'src="https://www.youtube-nocookie.com/embed/' + videoID + '?v=' + videoID + '&autohide=1&fs=1&rel=0&hd=1&wmode=transparent&enablejsapi=1&html5=1"' +
                                                'frameborder="0"' +
                                                'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
                                                'allowfullscreen>' +
                                            '</iframe>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            // If content Image
            } else {
                tmplSlide = '<div class="swiper-slide">' +
                                '<div class="cstm-popup-slide-content">' +
                                    '<div class="cstm-popup-slide-box">' +
                                        '<img src="' + src + '">' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            }

            tmplSlideElement.innerHTML = tmplSlide;
            const slide = tmplSlideElement.content.firstChild;

            const box = slide.querySelector( '.cstm-popup-slide-box' );
            box.addEventListener( 'click', function(e) {
                e.stopPropagation();
            });

            wrapper.append( slide );
        })

        return content;
    }
}
