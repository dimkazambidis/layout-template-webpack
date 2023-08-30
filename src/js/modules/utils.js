// Функция для читабельности значения
function prettify( num, suff, length ) {
    // Обрезаем пробелы
    let n = num.toString().replace(/[^0-9]/g, '');
    // Вставляем каждый третий символ пробел
    n = n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    // Подставляем суффикс если есть
    if ( suff ) {
        if ( suff === 'месяц' ) {
            if (length) {
                n =  n + ' мес'
            } else {
                n =  n + ' ' + declOfNum(num, ['месяц', 'месяца', 'месяцев'])
            }
            
        } else if ( suff === 'день' ) {
            n =  n + ' ' + declOfNum(num, ['день', 'дня', 'дней'])
        } else if ( suff === 'год' ) {
            n =  n + ' ' + declOfNum(num, ['год', 'года', 'лет'])
        } else {
            n = n + ' ' + suff;
        }
    }
  
    return n;
}
  
// Функция для склонения
function declOfNum( n, text_forms ) {  
    n = Math.abs( n ) % 100; 
    let n1 = n % 10;
    if ( n > 10 && n < 20 ) { return text_forms[ 2 ]; }
    if ( n1 > 1 && n1 < 5 ) { return text_forms[ 1 ]; }
    if ( n1 == 1 ) { return text_forms[ 0 ]; }
    return text_forms[ 2 ];
}

export { prettify, declOfNum }