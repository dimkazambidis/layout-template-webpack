import Inputmask from '../../../node_modules/inputmask/bundle.js';
import {prettify} from './utils.js'
import {Select} from '../modules/select.js';
import {RangeSlider} from '../modules/range-slider.js';
import {DateFields} from '../modules/date-fields.js';
import {FieldAnimation} from './field-animation.js';

function getFormElement( el ) {
    return ( typeof el == 'string' ) ? document.querySelector( el ) : el
}

export class Forms {
    init( formElement ) {
        const form = ( getFormElement( formElement ) ) ? getFormElement( formElement ) : document;
        const fieldList = form.querySelectorAll( 'input, select, textarea' );

        fieldList.forEach( field => {
            if ( !field.formInit ) {
                field.formInit = true;
                
                if ( field.required ) {
                    field.isChecked = false;
                    if ( field.nodeName.toLowerCase() === 'select' || field.type === 'checkbox' ) {
                        field.addEventListener( 'change', function() {
                            field.isChecked = true;
                        })
                    } else {
                        field.addEventListener( 'blur', function() {
                            field.isChecked = true;
                        })
                    }
                }
                
                if ( field.getAttribute( 'type' ) === 'checkbox' || field.getAttribute( 'type' ) === 'radio' ) {
                    field.startValue = field.checked;
                } else {
                    field.startValue = field.value;
                }
                
                // Маска телефона
                if ( field.getAttribute( 'type' ) === 'tel' ) {
                    Inputmask({
                        'mask': '+7 (999) 999-99-99',
                        'placeholder': '_',
                        // 'clearMaskOnLostFocus': false
                    }).mask( field );
                }

                // Поле с числовым вводом
                if ( field.classList.contains( 'cstm-num' ) ) {
                    function prettifyVal() {
                        field.value = prettify( field.value );
                    }
                    field.addEventListener( 'input', prettifyVal)
                    field.addEventListener( 'change', prettifyVal)
                    field.addEventListener( 'blur', prettifyVal)
                }

                // Inputs checkboxes
                if ( field.classList.contains( 'cstm-checkbox' ) ) {
                    // Формируем шаблон для кастомного чекбокса
                    const tmplCheckboxContainer = document.createElement( 'template' );
                    tmplCheckboxContainer.innerHTML = '<span class="cstm-checkbox__checker">' +
                                                        '<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.951 11.656C4.95045 11.6566 4.94955 11.6566 4.949 11.656L0.707107 7.41413C0.316583 7.0236 0.316676 6.39034 0.7072 5.99982V5.99982C1.09757 5.60945 1.73052 5.60918 2.12111 5.99932L4.95 8.82502C4.95083 8.82585 4.95083 8.82719 4.95 8.82802V8.82802L12.728 1.05004C13.1185 0.659562 13.7515 0.659561 14.142 1.05004V1.05004C14.5325 1.4405 14.5325 2.07355 14.1421 2.46404L6.364 10.243L4.951 11.656V11.656Z" fill="currentColor"/></svg>' +
                                                    '</span>';
                    const checkboxContainer = tmplCheckboxContainer.content.firstChild;
                    const label = field.parentNode.querySelector( 'label' );
                    if ( label ) {
                        label.prepend( checkboxContainer );
                    }
                }

                // Inputs radio
                if ( field.classList.contains( 'cstm-radio' ) ) {
                    // Формируем шаблон для кастомного чекбокса
                    const tmplRadioContainer = document.createElement( 'template' );
                    tmplRadioContainer.innerHTML = '<span class="cstm-radio__checker"></span>';
                    const radioContainer = tmplRadioContainer.content.firstChild;
                    const label = field.parentNode.querySelector( 'label' );
                    if ( label ) {
                        label.prepend( radioContainer );
                    }
                }

                // Методы сообщения полей
                const inputContainer = field.closest( '.form-field' );
                let messageElement = ( inputContainer ) ? inputContainer.querySelector( '.form-message' ) : null;
                
                // Метод вызова сообщения поля
                function showMessage( message, type ) { // type: 'error', 'success', пустое
                    function createMessage() {
                        const templateMessage = document.createElement( 'template' );
    
                        templateMessage.innerHTML = '<div class="form-message _error"><span>'+ message +'</span></div>';
                        messageElement = templateMessage.content.firstChild;
                        
                        if ( message ) {
                            inputContainer.append( messageElement );
                        }

                        if ( type === 'error' ) {
                            field.classList.add( '_error' );
                            field.classList.remove( '_success' );
                            messageElement.classList.add( '_error' );
                            messageElement.classList.remove( '_success' );
                        } else if ( type === 'success' ) {
                            field.classList.add( '_success' );
                            field.classList.remove( '_error' );
                            messageElement.classList.add( '_success' );
                            messageElement.classList.remove( '_error' );
                        } else {
                            field.classList.remove( '_error' );
                            field.classList.remove( '_success' );
                            messageElement.classList.remove( '_success' );
                            messageElement.classList.remove( '_error' );
                        }
                    }
                    
                    if ( messageElement ) messageElement.remove();
                    createMessage();
                }

                // Метод удаления сообщения поля
                function hideMessage() {
                    if ( messageElement ) {
                        messageElement.remove();
                        field.classList.remove( '_error' );
                        field.classList.remove( '_success' );
                    }
                }

                field.showMessage = showMessage;
                field.hideMessage = hideMessage;
            }
        })

        if ( select ) select.init();
        if ( dateFields ) dateFields.init();
        if ( rangeSlider ) rangeSlider.init();
        if ( fieldAnimation ) fieldAnimation.init();
    }

    clear( formElement ) {
        const form = ( getFormElement( formElement ) ) ? getFormElement( formElement ) : document;
        const fieldList = form.querySelectorAll( 'input, select, textarea' );

        fieldList.forEach( field => {
            if ( !field.hasAttribute( 'data-noclear' ) && field.formInit ) {
                // Задаем изначальные значения
                if ( field.getAttribute( 'type' ) === 'checkbox' || field.getAttribute( 'type' ) === 'radio' ) {
                    field.checked = field.startValue;
                } else {
                    field.value = field.startValue;
                }

                // Кастомный range
                if ( field.classList.contains( 'cstm-range' ) ) {
                    field.updateValue();
                }
                // Кастомный select
                if ( field.classList.contains( 'cstm-select' ) ) {
                    if ( field.multiple ) field.multipleValue = [];
                    field.dispatchEvent( new Event( 'change', { bubbles: true } ) );
                }
                // Кастомное поле выбора даты
                if ( field.classList.contains( 'cstm-date' ) ) {
                    field.dispatchEvent( new Event( 'change', { bubbles: true } ) );
                }

                if ( !field.value ) field.classList.remove( '_fill' );
                field.classList.remove( '_success' );
                field.classList.remove( '_error' );
            }
        })
    }

    validation( formElement, method ) {
        const form = ( getFormElement( formElement ) ) ? getFormElement( formElement ) : document;
        const fieldList = form.querySelectorAll( 'input, select, textarea' );
        const dataValidation = ( form != document ) ? form.getAttribute( 'data-validation' ) : null;

        // Устанавливаем метод валидации (при событии input полей или submit формы)
        let methodValid;
        if ( !method ) {
            methodValid = ( dataValidation ) ? dataValidation : 'submit';
        } else {
            methodValid = method;
        }

        let validationList = [];

        fieldList.forEach( field => {
            const isChecked = ( methodValid === 'input' ) ? field.isChecked : true; 

            if ( field.required ) {
                // Простые пустые текстовые поля и textarea
                if ( field.type === 'text' || field.type === 'number' || field.nodeName.toLowerCase() == 'textarea' ) {
                    const valid = ( !field.value ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( 'Error message', 'error' )
                    } else if ( valid && isChecked ) {
                        field.showMessage( '', 'success' )
                    }
                }

                // Чекбоксы
                if ( field.type === 'checkbox' ) {
                    const valid = ( !field.checked ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( '', 'error' )
                    } else if ( valid && isChecked ) {
                        field.hideMessage()
                    }
                }

                // Поля для ввода email
                if ( field.type === 'email' ) {
                    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                    const valid = ( !regex.test( field.value ) ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( 'Error message', 'error' )
                    } else if ( valid && isChecked ) {
                        field.showMessage( '', 'success' )
                    }
                }

                // Поля для ввода телефона
                if ( field.type === 'tel' ) {
                    const regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                    const valid = ( !regex.test( field.value ) ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( 'Error message', 'error' )
                    } else if ( valid && isChecked ) {
                        field.showMessage( '', 'success' )
                    }

                    // Если есть поле с смс кодом
                    // const formContainer = inputTel.closest( '.form-validation' );
                    // const formSms = formContainer.querySelector( '.form-sms' );
                    // if ( formSms ) {
                    //     const btnSms = formSms.querySelector( '.btn' );

                    //     if ( !valid && inputTel.isChecked ) {
                    //         formSms.classList.add( '_disable' )
                    //     } else if ( valid && inputTel.isChecked ) {
                    //         formSms.classList.remove( '_disable' )
                    //     }

                    //     if ( !formSms.classList.contains( '_timer-on' ) ) {
                    //         btnSms.disabled = ( !valid ) ? true : false;
                    //     }
                    // }
                }

                // Поля для ввода кода СМС
                // if ( field.classList.contains( 'cstm-sms' ) ) {
                //     const regex = /^[0-9]{4}$/;
                //     const valid = ( !regex.test( field.value ) ) ? false : true;
                //     validationList.push( valid );

                //     if ( !valid && isChecked ) {
                //         field.showMessage( 'Error message', 'error' )
                //     } else if ( valid && isChecked ) {
                //         field.showMessage( '', 'success' )
                //     }
                // }

                // Поля для ввода даты
                if ( field.classList.contains( 'cstm-date' ) ) {
                    const regex = /^[0-9]{2}?[\.]?[0-9]{2}?[\.]?[0-9]{4}$/;
                    const valid = ( !regex.test( field.value ) ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( 'Error message', 'error' )
                    } else if ( valid && isChecked ) {
                        field.showMessage( '', 'success' )
                    }
                }

                // Селекты
                if ( field.nodeName.toLowerCase() === 'select' ) {
                    const valid = ( field.value === '' ) ? false : true;
                    validationList.push( valid );

                    if ( !valid && isChecked ) {
                        field.showMessage( 'Error message', 'error' )
                    } else if ( valid && isChecked ) {
                        field.showMessage( '', 'success' )
                    }
                }
            }
        })

        return ( validationList.indexOf( false ) !== -1 ) ? false : true;
    }

    update( formElement ) {
        this.init( formElement )
    }
}
window.forms =  new Forms();
forms.init();

const formValidationList = document.querySelectorAll( '[data-validation]' )
formValidationList.forEach( form => {
    let validationMethod = form.getAttribute( 'data-validation' );
    const fieldsList = form.querySelectorAll( 'input[required], textarea[required], select[required]' );
    const submitBtn = form.querySelector( '.form-btn button, input[type="submit"]' );

    fieldsList.forEach( field => {
        field.addEventListener( 'change', function(e) {
            console.log( validationMethod )
            if ( validationMethod === 'input' ) {
                forms.validation( form, validationMethod );
            }
        })
    })

    submitBtn.addEventListener( 'click', function(e) {
        if ( !submitBtn.disabled ) {
            const isValid = forms.validation( form, validationMethod );
            if ( !isValid ) {
                e.preventDefault();
                validationMethod = 'input';
            }
        }
    })
})

//<input id="www" class="field-anim" type="email" placeholder="E-mail" inputmode="email">
//console.log([document.querySelector( '#www' )])