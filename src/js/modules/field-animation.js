export class FieldAnimation {
    init( field ) {
        const animFields = ( !field ) ? document.querySelectorAll( '.field-anim' ) : [field];
        animFields.forEach( field => {
            if ( !field.classList.contains( 'field-anim_initialized' ) ) {
                field.classList.add( 'field-anim_initialized' );
                // Получаем плейсхолдер инпута и убираем его
                const placeholder = field.getAttribute( 'placeholder' );

                if ( field.getAttribute( 'type' ) === 'tel' ) { // Если инпут телефон
                    field.setAttribute( 'placeholder', '+7 (___) ___-__-__' );
                } else if ( field.classList.contains( 'input-passport' ) ) { // Если инпут пасспорт
                    field.setAttribute( 'placeholder', '____ - ______' );
                } else if ( field.classList.contains( 'input-passport-code' ) ) { // Если инпут код подразделения
                    field.setAttribute( 'placeholder', '___ - ___' );
                } else if ( field.classList.contains( 'input-snils' ) ) { // Если инпут СНИЛС
                    field.setAttribute( 'placeholder', '___-___-___-__' );
                } else if ( field.classList.contains( 'input[data-datepicker]' ) ) { // Если инпут дата
                    field.setAttribute( 'placeholder', '__.__.____' );
                } else { // Иначе очищаем плейсхолдер
                    field.setAttribute( 'placeholder', '' );
                }

                // Формируем шаблон для контейнера инпута
                const tmplFieldContainer = document.createElement( 'template' );
                const contentFieldContainer = '<label class="field-anim-label">' +
                                                    '<span class="field-anim-placeholder">' + 
                                                        '<span>' + placeholder + '</span>' +
                                                    '</span>' +
                                                '</label>';
                tmplFieldContainer.innerHTML = contentFieldContainer;
                const fieldContainer = tmplFieldContainer.content.firstChild;

                field.before( fieldContainer ); // Вставляем шаблон перед инпутом
                fieldContainer.prepend( field ); // Помещаем инпут в шаблон

                if ( field.value ) { // Проверяем имеет ли значение инпут
                    field.classList.add( '_fill' )
                }

                function checkField() {
                    if ( field.value ) {
                        field.classList.add( '_fill' )
                    } else {
                        field.classList.remove( '_fill' )
                    }
                }

                field.addEventListener( 'input', checkField ) // Проверяем имеет ли значение инпут при вводе   
                field.addEventListener( 'paste', checkField ) // Проверяем имеет ли значение инпут при вводе
                field.addEventListener( 'change', checkField ) // Проверяем имеет ли значение инпут при вводе
            }
        })
    }

    update( field ) {
        this.init( field )
    }
}
window.fieldAnimation = new FieldAnimation();