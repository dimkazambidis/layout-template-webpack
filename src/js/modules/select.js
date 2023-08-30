export class Select {
    init( select ) {
        const selectsList = ( !select ) ? document.querySelectorAll( 'select.cstm-select' ) : [select];
        const customSelects = [];

        selectsList.forEach( select => {
            if ( !select.classList.contains( 'select_initialized' ) ) {
                select.classList.add( 'select_initialized' );
                let activeIndex = 0;

                const options = select.querySelectorAll( 'option' );
                for( let i = 0; i < options.length; i++ ) {
                    activeIndex = ( options[ i ].selected ) ? i : activeIndex;
                }

                let placeholder = ( options[ activeIndex ].innerText ) ? options[ activeIndex ].innerText : 'Выберите';
                const value = options[ activeIndex ].value;
                const label = select.getAttribute( 'data-label' ) ? select.getAttribute( 'data-label' ) : '';

                // Template for select activator
                const tmplSelectActivator = document.createElement( 'template' );
                const contentSelectActivator = '<div class="cstm-select-activator">' +
                                                '<div class="cstm-select-label"><span>' + label + '</span></div>' +
                                                '<div class="cstm-select-text">' + placeholder + '</div>' +
                                                '<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
                                            '</div>';
                tmplSelectActivator.innerHTML = contentSelectActivator;
                const selectActivator = tmplSelectActivator.content.firstChild;
                if ( !label ) {
                    selectActivator.classList.add( '_centered' );
                }

                // Template for select droplist
                const tmplSelectDrop = document.createElement( 'template' );
                const contentSelectDrop = '<div class="cstm-select-drop" style="position: absolute">' +
                                                '<div class="cstm-select-list"></div>' +
                                            '</div>';
                tmplSelectDrop.innerHTML = contentSelectDrop;
                const selectDrop = tmplSelectDrop.content.firstChild;
                const selectList = selectDrop.querySelector( '.cstm-select-list' );

                if ( select.multiple ) {
                    selectDrop.classList.add( '_multiple' );
                }
                
                let multipleValue = [];
                let multipleText = [];

                select.multipleValue = [];

                options.forEach( option => {
                    if (option.getAttribute('selected') !== null) {
                        select.valueText = option.textContent;
                    }

                    // Template for select option
                    const tmplSelectItem = document.createElement( 'template' );
                    const contentSelectItem = '<div class="cstm-select-item" data-value="' + option.value + '">' +
                                                    '<div class="cstm-select-item-text">' + option.innerText + '</div>' +
                                                '</div>';
                    tmplSelectItem.innerHTML = contentSelectItem;
                    const selectItem = tmplSelectItem.content.firstChild;
                    
                    selectList.append( selectItem );

                    if ( value && option.value === value ) {
                        selectItem.classList.add( '_current' )
                    }
                    if ( option.disabled ) {
                        selectItem.classList.add( '_disabled' );
                    }
                })

                // Into Activator
                select.style.display = 'none';
                select.after( selectActivator );
                select.activatorElement = selectActivator;

                // Into Droplist
                selectDrop.style.display = 'none';
                selectActivator.after( selectDrop );
                select.dropElement = selectDrop;

                // Selects Array
                customSelects.push({
                    activator: selectActivator,
                    drop: selectDrop
                })

                const selectItems = selectDrop.querySelectorAll( '.cstm-select-item' )

                // Calculate droplist position
                function repositionDrop() { 
                    const offsetTop = selectActivator.offsetHeight;
                    const width = selectActivator.offsetWidth;
                    let top = selectActivator.getBoundingClientRect().top + window.pageYOffset + offsetTop + 7;
                    let left = selectActivator.getBoundingClientRect().left;
                    
                    selectDrop.style.width = width + 'px';
                    selectDrop.style.top = top + 'px';
                    selectDrop.style.left = left + 'px';

                    const bottomDrop = top + selectDrop.offsetHeight;
                    const bottomWindow = window.innerHeight + window.pageYOffset;

                    if ( bottomDrop > bottomWindow ) {
                        top = selectActivator.getBoundingClientRect().top + window.pageYOffset - selectDrop.offsetHeight - 7;
                        selectDrop.style.top = top + 'px';
                    }
                }
                
                // Reset droplist position
                function resetPositionDrop( activatorEl, dropEl ) {
                    dropEl.style.width = '';
                    dropEl.style.top = '';
                    dropEl.style.left = '';
                    activatorEl.after( dropEl );
                }

                // Show droplist
                function selectShow() {
                    selectActivator.classList.add( '_current' );
                    selectDrop.style.display = '';
                    document.body.append( selectDrop );
                    repositionDrop();
                    window.addEventListener( 'resize', repositionDrop, false)
                }

                // Hide droplist
                function selectHide() {
                    selectActivator.classList.remove( '_current' );
                    selectDrop.style.display = 'none';
                    resetPositionDrop( selectActivator, selectDrop );
                    window.removeEventListener( 'resize', repositionDrop, false);
                    select.dispatchEvent( new Event( 'change', { bubbles: true } ) );
                }

                // Hide all droplist
                function selectHideAll() {
                    customSelects.forEach( customSelect => {
                        customSelect.activator.classList.remove( '_current' );
                        customSelect.drop.style.display = 'none';
                        resetPositionDrop( customSelect.activator, customSelect.drop )
                    });
                    
                    window.removeEventListener( 'resize', repositionDrop, false)
                }

                // Remove disabled options
                function checkDisabledItems() {
                    for ( let i = 0; i < options.length; i++ ) {
                        if ( options[i].disabled ) {
                            selectItems[i].classList.add( '_disabled' );
                        } else {
                            selectItems[i].classList.remove( '_disabled' );
                        }
                    }
                }

                // Events
                select.addEventListener( 'change', function(e) {
                    if ( !select.multiple ) {
                        selectItems.forEach( selectItem => {
                            selectItem.classList.remove( '_current' );
                        })

                        selectItems.forEach( selectItem => {
                            if ( selectItem.getAttribute( 'data-value' ) === select.value ) {
                                selectItem.classList.add( '_current' );

                                const text = selectItem.querySelector( '.cstm-select-item-text' ).innerText;
                                selectActivator.querySelector( '.cstm-select-text' ).innerText = text;
                            }
                        })
                    }

                    if ( multipleValue.length && select.multiple ) {
                        multipleValue = select.multipleValue;
                        selectItems.forEach( selectItem => {
                            const value = selectItem.getAttribute( 'data-value' );
                            const text = selectItem.querySelector( '.cstm-select-item-text' ).innerText;
                            
                            if ( multipleValue.indexOf( selectItem.getAttribute( 'data-value' ) ) !== -1 ) {
                                selectItem.classList.add( '_current' );
                                if ( multipleValue.indexOf( value ) === -1 ) multipleValue.push( value );
                                if ( multipleText.indexOf( text ) === -1 ) multipleText.push( text );
                            } else {
                                selectItem.classList.remove( '_current' );
                                multipleValue = multipleValue.filter( item => item !== value );
                                multipleText = multipleText.filter( item => item !== text );
                            }
                        })
                        selectActivator.querySelector( '.cstm-select-text' ).innerText = select.valueText = ( multipleText.length ) ? multipleText.join( ' | ' ) : options[ 0 ].innerText;
                    }

                    checkDisabledItems();
                })

                selectActivator.addEventListener( 'click', function(e) {
                    if ( !selectActivator.classList.contains( '_current' ) && !selectActivator.classList.contains( '_disabled' ) ) {
                        selectHideAll();
                        selectShow();
                    } else {
                        selectHideAll();
                    }
                })

                selectItems.forEach( selectItem => {
                    selectItem.addEventListener( 'click', function(e) {
                        const value = selectItem.getAttribute( 'data-value' );
                        const text = selectItem.querySelector( '.cstm-select-item-text' ).innerText;

                        if ( select.multiple ) {
                            if ( !selectItem.classList.contains( '_current' ) ) {
                                selectItem.classList.add( '_current' );
                                multipleValue.push( value );
                                multipleText.push( text );
                                select.value = value;
                            } else {
                                selectItem.classList.remove( '_current' );
                                multipleValue = multipleValue.filter( item => item !== value );
                                multipleText = multipleText.filter( item => item !== text );
                                select.value = ( multipleValue.length ) ? select.value : '';
                            }
                            select.multipleValue = multipleValue;
                            selectActivator.querySelector( '.cstm-select-text' ).innerText = select.valueText = ( multipleText.length ) ? multipleText.join( ' | ' ) : options[ 0 ].innerText;
                        } else {
                            selectItems.forEach( selectItem => {
                                selectItem.classList.remove( '_current' );
                            })

                            selectItem.classList.add( '_current' );
                            select.value = value;
                            select.valueText = text;
                            selectActivator.querySelector( '.cstm-select-text' ).innerText = text;

                            selectHide();
                        }
                    })
                })

                document.addEventListener( 'click', function(e) {
                    if ( !selectActivator.contains(e.target) && !selectDrop.contains(e.target) && selectActivator.classList.contains( '_current' ) ) {
                        selectHide();
                    }
                })

                document.addEventListener( 'keydown', function(e) {
                    if ( e.code === 'Escape' && selectActivator.classList.contains( '_current' ) ) {
                        selectHide();
                    }
                })
            }
        })
    }

    destroy( select ) {
        const selectsList = ( !select ) ? document.querySelectorAll( 'select.cstm-select' ) : [select];
        selectsList.forEach( select => {
            select.classList.remove( 'select_initialized' );
            select.style.display = '';

            if ( select.activatorElement && select.dropElement ) {
                select.activatorElement.remove();
                select.dropElement.remove();
            }
        })
    }

    reInit( select ) {
        this.destroy( select );
        this.init( select );
    }

    // update( select ) {
    //     const selectsList = ( !select ) ? document.querySelectorAll( 'select.cstm-select' ) : [select];
    //     selectsList.forEach( select => {

    //     })
    // }
}
window.select = new Select();

// <select class="cstm-select" data-label="Dynamic select"><option selected="selected">Select option</option><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option><option value="4">Option 4</option><option value="5">Option 5</option><option value="6">Option 6</option><option value="7">Option 7</option></select>