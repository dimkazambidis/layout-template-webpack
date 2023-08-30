import datepicker from 'js-datepicker'

export class DateFields {
    init( field ) {
        const datepickersList = ( !field ) ? document.querySelectorAll( 'input.cstm-date' ) : [field];
        datepickersList.forEach( field => {
            if ( !field.classList.contains( 'date_initialized' ) ) {
                field.classList.add( 'date_initialized' );
            
                // Mask Date
                Inputmask({
                    'mask': '99.99.9999',
                    'placeholder': '_',
                }).mask( field );

                // Datepicker plugin
                const picker = datepicker( field, {
                    startDay: 1,
                    customMonths: [
                        'Январь',
                        'Февраль',
                        'Март',
                        'Апрель',
                        'Май',
                        'Июнь',
                        'Июль',
                        'Август',
                        'Сентябрь',
                        'Октябрь',
                        'Ноябрь',
                        'Декабрь'
                    ],
                    customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    overlayPlaceholder: 'Введите год',
                    overlayButton: "Готово",
                    formatter: (input, date, instance) => {
                        const value = date.toLocaleDateString()
                        input.value = value
                    },
                    onSelect: (instance, date) => { // Принудительно вызываем србытие input для валидации
                        field.dispatchEvent( new Event( 'input', { bubbles: true } ) );
                    }
                })

                // Метод поля для установки активной даты
                function setDate( date ) {
                    const dateArray = date.split( /[.,/]/ );
                    const year = Number( dateArray[2] );
                    const month = Number( dateArray[1] - 1 );
                    const day = Number( dateArray[0] );
                    picker.setDate( new Date( year, month, day ) );
                    picker.navigate( new Date( year, month, day ) );
                }
                
                // Метод поля для установки максимальной даты для выбора
                function setMaxDate( date ) {
                    const dateArray = item.getAttribute( 'data-datepicker-max' ).split( /[.,/]/ );
                    const year = Number( dateArray[2] );
                    const month = Number( dateArray[1] - 1 );
                    const day = Number( dateArray[0] );
                    picker.setMax( new Date( year, month, day ) );
                    picker.navigate( new Date( year, month, day ) );
                }
        
                // Метод поля для установки минимальной даты для выбора
                function setMinDate( date ) {
                    const dateArray = item.getAttribute( 'data-datepicker-min' ).split( /[.,/]/ );
                    const year = Number( dateArray[2] );
                    const month = Number( dateArray[1] - 1 );
                    const day = Number( dateArray[0] );
                    picker.setMin( new Date( year, month, day ) );
                }
                field.setMaxDate = setMaxDate;
                field.setMinDate = setMinDate;

                // Не младше n-го числа лет
                if ( field.getAttribute( 'data-date-older' ) ) {
                    const age = Number( field.getAttribute( 'data-date-older' ) );
                    const now = new Date();
                    const year = now.getFullYear() - age;
                    const month = now.getMonth();
                    const day = ( leapYear( now.getFullYear() ) && month === 1 && now.getDate() === 29 ) ? 28 : now.getDate();

                    // Проверка на високосный год
                    function leapYear( y ) {
                        return ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0);
                    }

                    picker.setMax( new Date( year, month, day ) );
                    picker.navigate( new Date( year, month, day ) );
                }

                // Если дата предустановлена
                if ( field.value ) {
                    const dateArray = field.value.split( /[.,/]/ );
                    picker.setDate( new Date(
                        Number( dateArray[2] ),
                        Number( dateArray[1] - 1 ),
                        Number( dateArray[0] )
                    ));
                    picker.navigate( new Date(
                        Number( dateArray[2] ),
                        Number( dateArray[1] - 1 ),
                        Number( dateArray[0] )
                    ))
                }

                // События
                field.addEventListener( 'change', function() {
                    setDate( field.value )
                })
            }
        })
    }
    update( field ) {
        this.init( field )
    }
}
window.dateFields = new DateFields();