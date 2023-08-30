import rangesliderJs from 'rangeslider-js'
import {prettify} from './utils.js'

export class RangeSlider {
    init( field ) {
        const rangesList = ( !field ) ? document.querySelectorAll( 'input.cstm-range' ) : [field];
        rangesList.forEach( range => {
            if ( !range.classList.contains( 'range_initialized' ) ) {
                range.classList.add( 'range_initialized' );

                // Создаем обёртку для range
                const rangeWrapper = document.createElement( 'div' );
                rangeWrapper.classList.add( 'range-wrapper' );
                range.after( rangeWrapper );
                rangeWrapper.append( range );
                range.wrapperElement = rangeWrapper;

                // Инициализируем плагин rangesliderJs
                rangesliderJs.create( range, {
                    value: range.value,
                    // onSlideEnd: () => {
                    //     console.log( range.value )
                    // }
                });
                const sliderBox = range.parentNode.querySelector( '.rangeslider' )
                const suffix = range.getAttribute( 'data-suffix' );
                const rangeMin = Number( range.getAttribute( 'min' ).replace( /[^0-9]/g, '' ) )
                const rangeMax = Number( range.getAttribute( 'max' ).replace( /[^0-9]/g, '' ) )

                // Создаём шкалу с чекпоинтами внизу
                let checkpointsLine;
                function createCheckpoints( min, max ) {
                    if ( !range.getAttribute( 'data-hide-checkpoints' ) ) {

                        // Создаем и распологаем чекпоинты внизу
                        checkpointsLine = document.createElement( 'div' );
                        checkpointsLine.classList.add( 'range-checkpoints' );
                        rangeWrapper.after( checkpointsLine );

                        // Создаем и распологаем стартовый чекпоинт
                        const startCheckpoint = document.createElement( 'div' );
                        const startCheckpointField = range.getAttribute( 'placeholder' );
                        startCheckpoint.classList.add( 'range-checkpoints__start' );
                        startCheckpoint.setAttribute( 'data-field', startCheckpointField );
                        startCheckpoint.innerText = '' + prettify( min, suffix, true );
                        checkpointsLine.append( startCheckpoint );

                        // Создаем и распологаем финальный чекпоинт
                        const endCheckpoint = document.createElement( 'div' );
                        const endCheckpointField = range.getAttribute( 'placeholder' );
                        endCheckpoint.classList.add( 'range-checkpoints__end' );
                        endCheckpoint.setAttribute( 'data-field', endCheckpointField );
                        endCheckpoint.innerText = 'до ' + prettify( max, suffix, true ) ;
                        checkpointsLine.append( endCheckpoint );

                        // Создаем и распологаем произвольные чекпоинты
                        const checkpoint = JSON.parse( range.getAttribute( 'data-checkpoint' ) );
                        if ( checkpoint ) {
                            const value = Number(checkpoint.value)
                            const offsetPercent = (value * 100) / (max + min)

                            // Текст чекпоинта
                            const myCheckpoint = document.createElement( 'div' );
                            myCheckpoint.classList.add( 'range-checkpoints__my' );
                            myCheckpoint.innerText = checkpoint.textBefore + ' ' + prettify( value,  suffix) + ' ' + checkpoint.textAfter;
                            checkpointsLine.append( myCheckpoint );
                            myCheckpoint.style.left = offsetPercent + '%'

                            // Маркер чекпоинта
                            const myCheckpointMarker = document.createElement( 'div' );
                            myCheckpointMarker.classList.add( 'range-checkpoints__my-marker' );
                            checkpointsLine.append( myCheckpointMarker );
                            myCheckpointMarker.style.left = offsetPercent + '%';

                            range.addEventListener( 'input', function() {
                                if ( value < Number( range.value ) ) {
                                    myCheckpointMarker.classList.add( '_active' );
                                } else {
                                    myCheckpointMarker.classList.remove( '_active' );
                                }
                            })
                        }

                        range.checkpointsElement = checkpointsLine;
                    }
                }
                createCheckpoints( rangeMin, rangeMax );

                // Создаем и распологаем вспомогательное текстовое поле
                const sliderInput = document.createElement( 'input' );
                sliderInput.classList.add( 'range__input' );
                sliderInput.style.borderRadius = '0';
                sliderInput.setAttribute( 'type', 'text' );
                sliderBox.after( sliderInput );

                // Создаем и распологаем плейсхолдер
                const placeholder = document.createElement( 'div' );
                const placeholderSpan = document.createElement( 'span' );
                placeholder.classList.add( 'range__placeholder' );
                placeholder.append( placeholderSpan );
                placeholderSpan.innerText = range.getAttribute( 'placeholder' );
                sliderBox.after( placeholder );

                // Инициализация значения текстового поля ввода
                sliderInput.value = prettify( range.value, suffix );

                // Изменение поля range
                range.addEventListener( 'input', function() {
                    sliderInput.value = prettify( range.value, suffix );
                })

                function updateValue() {
                    const rangeMin = Number(range.getAttribute('min'))
                    const rangeMax = Number(range.getAttribute('max'))

                    // Синхронизируем значения текстого поля ввода и range
                    range.value = rangeMax > range.value ? range.value : rangeMax;
                    range.value = rangeMin < range.value ? range.value : rangeMin;
                    
                    // Обновляем данные range плагина
                    console.log(range.value)
                    range['rangeslider-js'].update({
                        min: rangeMin,
                        max: rangeMax,
                        value: range.value
                    })

                    // sliderInput.value = range.value;
                    
                }
                range.updateValue = updateValue;

                function changeInputText() {
                    const inputValue = Number( sliderInput.value.replace(/[^0-9]/g, '') );
                    const rangeMin = Number(range.getAttribute('min'))
                    const rangeMax = Number(range.getAttribute('max'))
                    
                    if ( inputValue < rangeMin ) { // Если меньше мин. значения
                        sliderInput.value = prettify( rangeMin, suffix );
                    } else if ( inputValue > rangeMax ) { // Если больше макс. значения
                        sliderInput.value = prettify( rangeMax, suffix );
                    } else { // Если соответствует мин. и макс. значениям
                        sliderInput.value = prettify( inputValue, suffix );
                    }

                    // Синхронизируем значения текстого поля ввода и range
                    range.value = Number( sliderInput.value.replace(/[^0-9]/g, '') );
                    range.value = rangeMax > range.value ? range.value : rangeMax;
                    range.value = rangeMin < range.value ? range.value : rangeMin;
                    
                    // Обновляем данные range плагина
                    range['rangeslider-js'].update({
                        min: rangeMin,
                        max: rangeMax,
                        value: range.value
                    })
                }

                // Изменение текстового поля ввода
                sliderInput.addEventListener( 'change', changeInputText );
                sliderInput.addEventListener( 'blur', changeInputText );

                // Удаляем суффикс при фокусе
                sliderInput.addEventListener( 'focus', function() {
                    sliderInput.value = prettify( sliderInput.value );
                })
                
                // Добавляем разделяющие пробелы при каждом вводе
                sliderInput.addEventListener( 'input', function() {
                    sliderInput.value = prettify( sliderInput.value );
                    console.log( [sliderInput, sliderInput.value] )
                })

                range.dispatchEvent( new Event( 'input', { bubbles: true } ) );
            }
        })
    }

    destroy( field ) {
        const rangesList = ( !field ) ? document.querySelectorAll( 'input.cstm-range' ) : [field];
        rangesList.forEach( range => {
            if ( range.wrapperElement ) {
                range.classList.remove( 'initialized' );
                range.style.display = '';
                range.wrapperElement.before( range );
                
                const sliderHandle = range[ 'rangeslider-js' ];
                sliderHandle.destroy();
                
                range.wrapperElement.remove();
            }

            if ( range.checkpointsElement ) {
                range.checkpointsElement.remove();
            }
        })
    }

    reInit( field ) {
        this.destroy( field );
        this.init( field );
    }

    update( field ) {
        this.init( field );
    }
}
window.rangeSlider = new RangeSlider();