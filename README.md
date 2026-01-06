# Observations Service  
_NodeJS сервіс для управління подіями активності авторів (AuthorEvent) у проєкті Cosmorum._

## Опис проєкту
Клієнтська частина реалізує UI для роботи з астрономічними спостереженнями та авторами: перегляд списку спостережень, фільтрація та пагінація, створення, редагування та видалення сутностей, сторінка спостереження з режимами View / Edit, інтеграція з REST API.  

___

## Технологічний стек
- Node.js  
- TypeScript  
- Express  
- MongoDB  
- Mongoose  
- Zod  
- Axios
  
___

## Архітектура  
Сервіс побудований як REST API та надає ендпоінти для роботи з подіями авторів:  
- /api/entity3 — створення та отримання подій автора  
- /api/entity3/_counts — отримання кількості подій для набору авторів  

_Валідація існування автора виконується шляхом запиту до зовнішнього сервісу авторів (Task2)._  

___

## Запуск сервера
_Перед запуском цієї частини проєкту необхідно впевнитися, що виконано вказівки, надані в README репозиторіїв 1-3, оскільки це критично для роботи системи._  

### Клонування репозиторію (завантаження https://github.com/OlesiaShevchenko245/Internship_Task4)  
```
git clone <repository-url>
cd Internship_Task4
```
### Встановлення залежностей  
```
npm install
npm i express mongoose axios zod
jest ts-jest @types/jest supertest @types/supertest
npm i -D mongodb-memory-server nock
```
### Налаштування MongoDB  
За замовчуванням використовується підключення:  
```
mongodb://localhost:27017/task4_author_events
```
### Запуск
```
npm run dev
```
Сервіс має запуститися на http://localhost:3001  

### Перевірка роботи
```
# створити подію автора
curl -X POST http://localhost:3001/api/entity3 \
  -H "Content-Type: application/json" \
  -d '{"authorId":1,"type":"SYSTEM","title":"Author activity event"}'
```
_Очікуваний результат - JSON новоствореної події._  
```
# отримати список подій автора
curl "http://localhost:3001/api/entity3?entity1Id=1&size=5&from=0"
```
_Очікуваний результат - JSON списку подій._  
```
# отримати кількість подій авторів
curl -X POST http://localhost:3001/api/entity3/_counts \
  -H "Content-Type: application/json" \
  -d '{"entity1Ids":[1,2,3,4,5]}'
```
_Очікуваний результат - JSON списку авторів з відповідною кількістю подій._  

___

### Структура проєкту:
```
Internship_Task4/
├── src/
│   ├── controllers/
│   │   └── entity3.controller.ts
│   ├── models/
│   │   └── authorEvent.model.ts
│   ├── routes/
│   │   └── entity3.routes.ts
│   ├── services/
│   │   └── task2Client.ts
│   ├── validation/
│   │   └── authorEvent.schemas.ts
│   ├── middlewares/
│   │   └── error.middleware.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── entity3.post.int.test.ts
│   ├── entity3.get.int.test.ts
│   └── entity3.counts.int.test.ts
├── package.json
├── tsconfig.json
└── README.md
```
___

### Функціональність  

1. Створення події автора:  
- створення нового запису AuthorEvent  
- валідація обовʼязкових полів  
- автоматичне встановлення часу події (occurredAt), якщо його не передано  
- перевірка існування автора через сервіс авторів  
  
2. Отримання подій автора:  
- отримання списку подій, що належать одному автору  
- сортування за часом у порядку спадання (найновіші першими)  
  
3. Пагінація:  
- серверна пагінація  
- параметри size та from  
- можливість поетапного підвантаження подій  
  
4. Підрахунок кількості подій:  
- отримання кількості подій для кожного автора  
- використання агрегаційних запитів MongoDB  
- відсутність завантаження самих обʼєктів подій

___

### Інтеграція з API:  
Використані endpoints:  
- POST /api/entity3  
- GET /api/entity3  
- POST /api/entity3/_counts

Для перевірки існування автора використовується зовнішній сервіс:  
- GET /api/author/{id}  

_Інтеграція реалізована через HTTP-запити за допомогою Axios._  
___

## Валідація

Для валідації реалізовано:  
- перевірку обовʼязкових полів у запитах  
- перевірку типів та форматів даних  
- автоматичну генерацію часу події  
- відмову у створенні події, якщо відповідний автор не існує
  
___

## Автор

Проєкт виконала Олеся Шевченко в рамках **Full-Stack Internship** :)
