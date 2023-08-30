import {Media} from '../modules/media.js';

const mediaTabs = new Media();
mediaTabs.init();

export class Tabs {
    init() {
        const ctx = this;
        const duration = 300;
        const tabsContainers = document.querySelectorAll( '.cstm-tabs' );
        tabsContainers.forEach( tabsContainer => {
            if ( !tabsContainer.classList.contains( 'activated' ) ) {
                tabsContainer.classList.add( 'activated' ); 
                
                const navContainer = tabsContainer.querySelectorAll( '.cstm-tabs-nav' )[0];
                const navNodes = navContainer.querySelectorAll( '.cstm-tabs__btn' );
                const contentContainer = tabsContainer.querySelectorAll( '.cstm-tabs-body' )[0];
                const contentItems = Array.from( contentContainer.children ).filter(
                    item => item.classList.contains( 'cstm-tabs__content' ) === true
                );
                const mediaAccordion = tabsContainer.getAttribute( 'data-tabs-accordion' );
                const mediaSelect = tabsContainer.getAttribute( 'data-tabs-select' );

                let activeIndex = 0;

                contentItems.forEach( contentItem => {
                    contentItem.style.transition = `opacity ${duration}ms, height ${duration}ms`
                })

                // Function for init active tab
                function initItem( index ) {
                    for ( let i = 0; i < navNodes.length; i++ ) {
                        if ( i === index ) {
                            navNodes[ i ].classList.add( '_current' );
                        } else {
                            navNodes[ i ].classList.remove( '_current' );
                            contentItems[ i ].style.maxHeight = 0;
                            contentItems[ i ].style.opacity = 0;
                        }
                    }
                }

                // Function from toggle desktop tabs
                function toggleDesktopTabs( navTo, contentTo, navFrom, contentFrom ) {
                    const heightTo = contentTo.scrollHeight;
                    const heightFrom = contentFrom.scrollHeight;
                    const durationOffset = duration - (duration / 3);

                    // Hide desktop tab
                    navFrom.classList.remove( '_current' );
                    contentFrom.classList.remove( '_active' );
                    contentFrom.style.opacity = 0;
                    setTimeout( function() {
                        contentFrom.style.maxHeight = 0;
                    }, durationOffset)

                    // Show desktop tab
                    contentTo.style.height = heightFrom + 'px';
                    setTimeout( function() {
                        navTo.classList.add( '_current' );
                        contentTo.classList.add( '_active' );
                        contentTo.style.maxHeight = '';
                        contentTo.style.height = heightTo + 'px';
                        setTimeout( function() {
                            contentTo.style.opacity = 1;
                        }, durationOffset)
                        setTimeout( function() {
                            contentTo.style.height = '';
                        }, duration)
                    }, durationOffset)
                }

                // Function from toggle accordion tabs
                function toggleAccordionTabs( navTo, contentTo, navFrom, contentFrom ) {
                    const durationOffset = duration - (duration / 3);

                    // Hide accordion tab
                    navFrom.classList.remove( '_current' );
                    contentFrom.classList.remove( '_active' );
                    contentFrom.style.opacity = 0;
                    contentFrom.style.height = contentFrom.scrollHeight + 'px';
                    setTimeout( function() {
                        contentFrom.style.height = 0;
                    }, durationOffset)
                    setTimeout( function() {
                        contentFrom.style.maxHeight = 0;
                    }, duration * 2)

                    // Show accordion tab
                    contentTo.style.height = 0;
                    setTimeout( function() {
                        navTo.classList.add( '_current' );
                        contentTo.classList.add( '_active' );
                        contentTo.style.maxHeight = '';
                        contentTo.style.height = contentTo.scrollHeight + 'px';
                        setTimeout( function() {
                            contentTo.style.opacity = 1;
                        }, durationOffset)
                        setTimeout( function() {
                            contentTo.style.height = '';
                        }, duration)
                    }, durationOffset)
                }
                
                // Define ative element index
                for ( let i = 0; i < navNodes.length; i++ ) {
                    const navItem = navNodes[ i ];
                    if ( navItem.classList.contains( '_current' ) ) {
                        activeIndex = i;
                    }
                }

                // Init active element index
                initItem( activeIndex )

                // Event click to tab
                for ( let i = 0; i < navNodes.length; i++ ) {
                    const navItem = navNodes[ i ];

                    navItem.addEventListener( 'click', function( e ) {
                        e.preventDefault();

                        if ( !navItem.classList.contains( '_current' ) ) {
                            const navTo = navNodes[ i ];
                            const contentTo = contentItems[ i ];
                            const navFrom = navNodes[ activeIndex ];
                            const contentFrom = contentItems[ activeIndex ];
                            
                            if ( mediaAccordion && !mediaTabs.query( `(min-width: ${mediaAccordion}px)` ) ) {
                                toggleAccordionTabs( navTo, contentTo, navFrom, contentFrom );
                            } else {
                                toggleDesktopTabs( navTo, contentTo, navFrom, contentFrom );
                            }
                            activeIndex = i;
                        }
                    })
                }

                // Tabs to accordion
                if ( mediaAccordion ) {
                    mediaTabs.query( `(min-width: ${mediaAccordion}px)`, {
                        to: function() {
                            contentItems.forEach( item => {
                                contentContainer.append( item );
                                ctx.reInit();
                            })
                        },
                        from: function() {
                            contentItems.forEach( ( item, i ) => {
                                navNodes[i].after( item );
                                ctx.reInit();
                            })
                        }
                    });
                }

                // Tabs to select
                if ( mediaSelect ) {
                    let selectContainer
                    let selectActivator

                    function checkCurrent() {
                        selectActivator.innerHTML = this.innerHTML
                        navContainer.style.display = 'none'
                        selectContainer.classList.remove( '_active' )
                    }

                    function showTabsNav() {
                        navContainer.style.display = ''
                        selectContainer.classList.add( '_active' )
                    }

                    function hideTabsNav() {
                        navContainer.style.display = 'none'
                        selectContainer.classList.remove( '_active' )
                    }

                    function clickSelectActivator() {
                        const isActive = selectContainer.classList.contains( '_active' )
                        if ( isActive ) {
                            hideTabsNav()
                        } else {
                            showTabsNav()
                        }
                    }

                    function pressEscape( event ) {
                        const isActive = selectContainer.classList.contains( '_active' )
                        if ( event.code === 'Escape' && isActive ) hideTabsNav()
                    }

                    function clickOutSelect( event ) {
                        const isActive = selectContainer.classList.contains( '_active' )
                        const isNav = event.target.closest( '.cstm-tabs-select' )
                        if ( !isNav && isActive ) hideTabsNav()
                    }

                    mediaTabs.query( `(min-width: ${mediaSelect}px)`, {
                        to: function() {
                            if ( selectContainer ) {
                                selectContainer.after( navContainer )
                                selectContainer.remove()
                                navContainer.style.display = ''

                                // Remove select events
                                navNodes.forEach( item => {
                                    item.removeEventListener( 'click', checkCurrent )
                                })
                                selectActivator.removeEventListener( 'click', clickSelectActivator )
                                document.removeEventListener( 'keydown', pressEscape )
                                document.removeEventListener( 'click', clickOutSelect )
                            }
                        },
                        from: function() {
                            // Template for select
                            const templateSelect = document.createElement( 'template' )
                            templateSelect.innerHTML = '<div class="cstm-tabs-select">' +
                                                            '<div class="cstm-tabs-select__activator">111</div>' +
                                                        '</div>'
                            selectContainer = templateSelect.content.firstChild
                            selectActivator = selectContainer.querySelector( '.cstm-tabs-select__activator' )

                            navContainer.style.display = 'none'
                            navContainer.before( selectContainer )
                            selectContainer.append( navContainer )

                            // Check start value
                            navNodes.forEach( item => {
                                const isCurrent = item.classList.contains( '_current' )
                                if ( isCurrent ) selectActivator.innerHTML = item.innerHTML
                            })

                            // Events for select
                            navNodes.forEach( item => {
                                item.addEventListener( 'click', checkCurrent )
                            })
                            selectActivator.addEventListener( 'click', clickSelectActivator )
                            document.addEventListener( 'keydown', pressEscape )
                            document.addEventListener( 'click', clickOutSelect )
                        }
                    });
                }
            }
        });
    }

    reInit() {
        this.init();
    }
}

window.tabs = new Tabs();
tabs.init();