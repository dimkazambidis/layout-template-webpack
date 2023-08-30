# layout-template-webpack
Webpack шаблон для вёрстки
## Установка пакетов
npm i

## Сервер разработки
npm run dev

## Билд для продакшена
npm run build

## Модуль модального окна
### Расположение
./src/js/modules/popup.js
### Использование
#### По умолчанию
Используемые атрибуты
```html
<a
   href="#"
   data-popup
   data-popup-src="#popup"
   data-position="center">
   Text link
</a>
```
- [data-popup] - селектор для активатора попапа (по умолчанию)
- [data-popup-src] - селектор для элемента, являющегося контентом попапа
- [data-position] - Не обязательный (по умолчанию 'center'). Позиция попапа (center, top , left, right, bottom, top left, top right, bottom left, bottom right)
#### Опции и параметры по умолчанию
```JavaScript
{
    src: '', // Селектор для контента попапа  (String)
    activator: '[data-popup]', // Селектор для активатора попапа (String)
    position: 'center', // Позиция окна попапа (center, top, left, rigt, bottom) (String)
    contentElement: null, // Элемент для контента попапа (например, для результата ajax запроса) (Node)
    text: '', // Текст для контента (String)
    contentNotFound: 'Content not found', // Сообщение, если контент для попапа не задан (String)
    beforeShow( popup ) {}, // Отработает до открытия попапа (argument popup - node popup element)
    afterShow( popup ) {}, // Отработает после открытия попапа (аргумент popup - элемент окна попапа)
    beforeHide( popup ) {}, // Отработает перед закрытием попапа (аргумент popup - элемент окна попапа)
    afterHide( popup ) {} // Отработает после закрытия попапа (аргумент popup - элемент окна попапа)
}
```
#### Базовый синтаксис
```JavaScript
let popup = new Popup();
popup.init({
   parameters...
});
```
#### Методы
- show() - Открыть попап с параметрами
- hide() - Закрыть попап с параметрами (callbacks)
```JavaScript
let popup = new Popup();

activator.addEventListener( 'click', function() {
   popup.show({
      parameters...
   });
}, false);

closer.addEventListener( 'click', function() {
   popup.hide({
      parameters...
   });
}, false);
```
## Плагин галереи для модального окна
Подключаемое расширение для модуля попапа для отображения галереи (изображения и видео из YouTube)
### Расположение
./src/js/modules/popup-gallery.js
### Использование
#### HTML
```html
<div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="https://youtu.be/EU4M9gWhUHQ"
      data-type="youtube">
      <img src="images/preview.png">
   </div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="images/img1.png">
      <img src="images/img1.png">
   </div>
   <div
      data-popup-gallery="gallery"
      data-popup-src="images/img2.png">
      <img src="images/img2.png">
   </div>
</div>
```
- [data-popup-gallery] - Имя галереи, к которой пренадлежит
- [data-popup-src] - Путь к файлу (изображение или видео)
- [data-type] - Не обязательный. Тип контента (значение 'youtube' или можно опустить)
#### JS
Требуется подключеный плагин карусели swiper (<https://swiperjs.com/>)
```JavaScript
const gallery = new PopupGallery();
gallery.init();
```
## Модуль медазапросов
### Расположение
./src/js/modules/media.js
### Использование
#### Опции и параметры по умолчанию
```JavaScript
{
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1200
}
```
#### Инициализация
```JavaScript
let media = new Media();
media.init({
   parameters...
});
```
#### Базовый синтаксис
```JavaScript
media.xl({
   to: function() {
      ...
   },
   from: function() {
      ...
   }
});
```
- to() - срабатывает, когда (min-width: xl)
- from() - срабатывает, когда (max-width: xl - 1px)
#### Для любых медазапросов
```JavaScript
media.query( '(min-width: 768px)', {
   to: function() {
      ...
   },
   from: function() {
      ...
   }
})
```
Первый параметр - это пользовательский медиа-запрос (например: '(max-height: 720px)')
#### Использование медиазапросов true/false
```JavaScript
if ( media.xl() ) { // true/false если min-width соответствует параметру xl
   ...
}
if ( media.query( '(min-width: 768px)' ) ) { // true/false если удовлетворяет условию (min-width: 768px)
   ...
}
```
- Метод, имеющий название параметра (например: xl()) вернёт true или false (min-width: xl)
- Метод query() вернёт true или false (min-width: (условие))
