export class Accordion {
    init() {
        const duration = 300;
        const durationOffset = duration - (duration / 3);
        const accordionContainers = document.querySelectorAll( '.cstm-accordion' );

        accordionContainers.forEach( accordionContainer => {
            if ( !accordionContainer.classList.contains( 'activated' ) ) {
                accordionContainer.classList.add( 'activated' );

                const accordionList = accordionContainer.querySelectorAll( '.cstm-accordion-list' )[0];
                const accordionItems = Array.from( accordionList.children ).filter(
                    item => item.classList.contains( 'cstm-accordion-item' ) === true
                );
                
                if ( accordionItems.length ) {
                    let i = 0;
                    accordionItems.forEach( accordionItem => {
                        const btn = Array.from( accordionItem.children ).filter(
                            item => item.classList.contains( 'cstm-accordion-item__header' ) === true
                        )[0];
                        const content = Array.from( accordionItem.children ).filter(
                            item => item.classList.contains( 'cstm-accordion-item__content' ) === true
                        )[0];

                        content.style.transition = `opacity ${duration}ms, height ${duration}ms`

                        function itemInit() {
                            if ( !accordionItem.classList.contains( '_active' ) ) {
                                content.style.maxHeight = 0;
                                content.style.height = 0;
                                content.style.opacity = 0;
                            }
                        }

                        // Function from open accordion
                        function openAccordion( contentTo ) {
                            // Show accordion
                            accordionItem.classList.add( '_active' );
                            contentTo.style.maxHeight = '';
                            contentTo.style.height = contentTo.scrollHeight + 'px';
                            setTimeout( function() {
                                contentTo.style.opacity = 1;
                            }, durationOffset)
                            setTimeout( function() {
                                contentTo.style.height = '';
                            }, duration)
                        }

                        // Function from close accordion
                        function closeAccordion( contentTo ) {
                            // Hide accordion
                            accordionItem.classList.remove( '_active' );
                            contentTo.style.opacity = 0;
                            contentTo.style.height = contentTo.scrollHeight + 'px';
                            setTimeout( function() {
                                contentTo.style.height = 0;
                                setTimeout( function() {
                                    contentTo.style.maxHeight = 0;
                                }, duration)
                            }, durationOffset)
                        }

                        // Function from toggle accordion
                        function toggleAccordion( contentTo ) {
                            accordionItems.forEach( item => {
                                if ( item.classList.contains( '_active' ) ) {
                                    item.classList.remove( '_active' );
                                    const contentFrom = Array.from( item.children ).filter(
                                        item => item.classList.contains( 'cstm-accordion-item__content' ) === true
                                    )[0];
                                    
                                    closeAccordion( contentFrom );
                                }
                            })
                            setTimeout( function() {
                                accordionItem.classList.add( '_active' );
                                openAccordion( contentTo )
                            }, durationOffset )
                        }

                        // Event click to accordion
                        btn.addEventListener( 'click', function(e) {
                            e.preventDefault();

                            if ( !accordionItem.classList.contains( '_active' ) ) {
                                if ( !accordionContainer.hasAttribute( 'data-accordion-toggle' ) ) {
                                    openAccordion( content );
                                } else {
                                    toggleAccordion( content )
                                }
                            } else {
                                closeAccordion( content );
                            }
                        })

                        itemInit()
                        i++;
                    })
                }

            }
        })
    }

    reInit() {
        this.init();
    }
}
window.accordion = new Accordion();
accordion.init();