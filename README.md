# Феер Александр

## Установка
* git clone [https://github.com/FeerAlex/portfolio.git](https://github.com/FeerAlex/portfolio.git)
* cd portfolio
* yarn install
* yarn run start

## Список задач
- [X] Моя сборка на webpack
    - [X] Определиться со сборкой
    - [X] Добавить плагины
    - [X] Создать репозиторий
    - [X] Начать верстать
    - [X] Разместить проект на хостинг
- [X] Вёрстка 4х страниц
    - [X] Страница приветствия
    - [X] Обо мне
    - [X] Мои работы
    - [X] Блог
- [X] Адаптивная вёрстка. Анимации
    - [X] Делаем верстку "резиновой"
    - [X] Медиазапросы выставляем в стандартных точках
    - [ ] Делаем изображения адаптивными, в т.ч. под ретину
    - [X] Perfect pixel
    - [X] Flip эффект на основной странице
    - [X] Изменение кнопки основного меню при вызове
    - [X] Blur формы обратной связи
    - [X] Использование WebGL
- [X] Базовый JavaScript
    - [X] Загрузчик для страницы приветствия и для тех страниц, где это необходимо
    - [X] Эффекты
        - [X] Фуллскрин меню (гамбургер меню)
        - [X] "Переворачивание карточки" (flip) на странице приветствия
        - [X] Меню ("сайдбар") на странице блога
    - [X] Слайдер проектов
    - [X] Формы
        - [X] Валидация формы
        - [X] Вывод сообщений об ошибках с сервера
        - [X] Данные отправляем на сервер посредством технологии ajax
    - [X] Админка + Vue.js
        - [X] Верстка админки
        - [X] Подключение Vue.js к проекту Создание компонентов
        - [X] Передача данных между компонентами (props, $event)
        - [X] Использование ajax, настройка взаимодействия клиент-сервер
- [X] Работа с node.js
    - [X] Сервер Node.js - для статических файлов
    - [X] Собственные обработчики ошибок
    - [X] Основные схемы и модели данных Mongoose
    - [X] Передача и сохранение информации в базу данных с помощью технологии Ajax
    - [X] Авторизация

## Используемые плагины
* [Clean for WebPack](https://github.com/johnagan/clean-webpack-plugin)
    > Удаление папки с готовым проектом
* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
    > Генерация html файла с уже подключенным скриптом
* [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
    > Подключение css файлов
* [Optimize CSS Assets Webpack Plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
    > Оптимизация css файлов
* [Stylelint Plugin for Webpack](https://github.com/JaKXz/stylelint-webpack-plugin)
    > Проверка css файлов на соответсвие, принятому в команде, стилю кода
* [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
    > Оптимизация js файлов
* [Favicons Webpack Plugin](https://github.com/jantimon/favicons-webpack-plugin)
    > Генерация favicon для различных устройств

## Используемые лоадеры
* [Pug-loader](https://github.com/pugjs/pug-loader)
    > Компиляция pug файлов в html
* [Sass-loader](https://github.com/webpack-contrib/sass-loader)
    > Компиляция scss файлов в css
* [Eslint-loader](https://github.com/MoOx/eslint-loader)
    > Проверка js файлов на соответсвие, принятому в команде, стилю кода
* [Babel-loader](https://github.com/babel/babel-loader)
    > Компиляция es6 в es5
* [Img-loader](https://github.com/thetalecrafter/img-loader)
    > Оптимизация изображений
* [Svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)
    > Генерация svg-спрайта
* [Svgo-loader](https://github.com/rpominov/svgo-loader)
    > Оптимизация svg
* [Fontface-loader](https://github.com/sjorssnoeren/fontface-loader)
    > Генерация шрифтов
* [File-loader](https://github.com/webpack-contrib/file-loader)
    > Загрузка и парсинг файлов
* [Css-loader](https://github.com/webpack-contrib/css-loader)
    > Загрузка и парсинг css файлов
* [Postcss-loader](https://github.com/postcss/postcss-loader)
    > Необходим для подключения autoprefixer
