# "Проектирование веб-сервисов" в Политехе

Инструкция по разворачиванию проектов
-----

1. После получения файлов с GitHub перейти в папку с проектом
### `cd "путь к папке с проектом"`
2. Установить зависимости
### `npm install`
или сокращённый вариант (обычно используется для финальной версии проекта)
### `npm install --only=production`
3. Запустить проект
### `npm start app.js`
или запутить с автоперезагрузкой сервера после изменений
### `nodemon app.js`

Описание проектов
-----

- [node](https://github.com/itlavs/polytech_node/tree/master/node) - несколько простейших серверов на Node.js
- [express](https://github.com/itlavs/polytech_node/tree/master/express) - изучение основ работы с библиотекой Express
- [api](https://github.com/itlavs/polytech_node/tree/master/api) - управление списком пользователей (сервер: Express + Rest API + JSON, клиент: Bootstrap + JS + AJAX)
<img src="https://github.com/itlavs/polytech_node/blob/master/api/screenshot.png" alt="Управление списком пользователей">
