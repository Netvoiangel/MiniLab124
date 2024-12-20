# Мини-лабораторная 1, осень 24
### Про лабу
- Есть наработка одностраничной формы регистрации/атворизации. Её нужно доработать
- Используется библиотека стилей materialize. Рекомендую разобраться в том, как она работает в нашем коде и вообще
- В коде много комментариев, которые стоит прочитать. Там подсказки и доп знания по теме
- Есть участок с [демонстрационным кодом](https://github.com/DanilPestryakov/MiniLab124/blob/main/js/main.js#L4). Используюя его и консоль браузера можно быстро и относительно интересно познакомитсья с работой фронтенд приложения
- Три части задач: инфраструктурная + JS + верстка (всё, как в реальных проектах)


### Что можно узнать 
##### ("тема": "конкретное знание" => "что из этого вырастет потом")
- Менеджер пакетов JS: как устанавливать зависимости для проектов => работа со сборкой и деплоем проектов на JS, поддержка зависимостей и разворачивание своих Docker-контейнеров
- Основной синтаксис JS: стрелочные функции, экспортирование объектов, функциональный стиль, модификация DOM дерева, селекторы => продвинутые возможности JS, вход во фреймворки (VueJS, ReactJS)
- Верстка: устройство HTML страницы, импорт из CDN => понимание концепции HTML, умение дебажить элементы и верстать страницы
- Интсрументы: пнаель разработчика в браузере, изменение стилей, консоль => умение дебажить фронтенд код, быстрый просмотр стилей, умение сдавать курсы на openEdu без прохождения тестов


### Задание
##### Указано минимальное время, за которое можно выполнить часть задачи. В жизни, оно может быть умножено на 10
1. **Установить менеджер пакетов NodeJS** (20 минут+) (инфраструктура)
*Указания:* 
* &emsp; Необходимо перейти на [официальный сайт](https://nodejs.org/en/download/) и скачать последнюю стабильную версию &emsp; под вашу ОС
* &emsp; После загрузки инсталлятор следует запустить и установить Node.js, как любую другую программу.
* &emsp; Убедимся, что всё установилось. Для этого в cmder проверим версию Node. js с помощью команды node -v и npm -v
*Примечание:* [Оригинальный гайд](https://htmlacademy.ru/blog/js/installing-nodejs)
*Примечание:* При установке **не** убирайте настройку "Добавить в PATH". Иначе консоль не будет видеть ваши обращения к npm
2. **Склонировать проект, открыть его в IDE** (IntelliJ IDEA, Pycharm, WebStorm, ...), изучить структуру, найти где и что лежит, создать и настроить приватный репозиторий (30 минут+) (инфраструктура)
3. **Установить зависимости и открыть index.html** (5 минут+) (инфраструктура)
*Указание:* Для установки зависимостей, находясь в корне проекта, выполните в консоле команду *npm install*
4. **Реализовать валидацию пароля на JS** (10 минут+) (JS)
*Указание:* Требования валидации собственные, на усмотрение выполняющего
*Указание:* Смотреть пример валидации почты в main.js
*Прмечание:* Если поле невалидно - нужно красить красненьким. Можно использовать класс valid/invalid. Пример есть в демонстрационном блоке кода
*Прмечание:* Не обязательно использовать regexp, но желательно.
5. **Реализовать форму авторизации по аналогии с формой регистрации.** (30 минут+) (HTML+CSS+JS)
Указание: Для добавления функционала лучше использовать селекторы по классу, чтобы не дублировать код
6. **Блокировать кнопку регистрации/авторизации пока все поля не станут валидными** (20 минут+) (JS+HTML)
*Указание:* используйте функцию getValidationStatus и свойство disabled у HTML-объекта. Если какое-то поле поменялось - оно может перестать быть валидным. Хороший тон сразу уведомить об этом пользователя, а не после нажатия на кнопку отправки формы
7. (*) **Адаптировать форму для телефонов, другие изменения в стилях и верстке** (CSS)
*Прмечание:* **Необязательное** творческое задание, позволит набрать за лабу чуть больше баллов.


### Материалы
- [Крутой сайт про фронтенд](https://doka.guide/html/)
- [Документация библиотеки стилей](https://materializecss.com/)
- [Best practices по формам авторизации](https://uxplanet.org/12-best-practies-for-sign-up-and-login-page-design-69d6cd045cf) (UX)
- [Документация пакетного менеджера npm](https://docs.npmjs.com/)
- Статья про [regExp](https://habr.com/ru/post/545150/), про [regExp в JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)


### Вопросы
##### Появятся на Trello 
* Почему скрипт main.js нужно импортировтаь в HTML в конце?
* Зачем нужен файл package-lock.json в проекте?


### Настройка репозитория
Сделайте свою копию репозитория. Как это сделать, описано [тут](https://gist.github.com/0xjac/85097472043b697ab57ba1b1c7530274) или [тут](https://stackoverflow.com/questions/10065526/github-how-to-make-a-fork-of-public-repository-private). Или можно создать чистый репозиторий самостоятельно и залить код туда.

Если создаете приватный репозиторий, ответным письмом будет отправлен логин преподавателя, которого нужно добавить в коллабораторы.

### Отправка задания
Выполните задания, сохраните изменения, сделайте commit и push в свой репозиторий.

Напишите на почту apicourse@yandex.ru письмо с темой вида MiniLab124 ФИО группа с просьбой проверить работу. В письме должна быть ссылка на репозиторий с выполненной работой, проверяться будет версия, которая лежит в ветке main. В ветке main не должно быть файлов и папок с русскими названиями!

### Дедлайн
**Дедлайн:** 23:59 18/11/2024 (18 ноября).
