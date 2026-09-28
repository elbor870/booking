// server/index.js

const express = require('express');
const path = require('path');

// Подключаем роутеры
const coursesRouter = require('./routes/courses');
const bookingsRouter = require('./routes/bookings');
const reviewsRouter = require('./routes/reviews');
const calculateRouter = require('./routes/calculate'); 

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
// Учим сервер понимать JSON в теле запроса
app.use(express.json());

// Раздаём статику фронтенда из папки client/
app.use(express.static(path.join(__dirname, '..', 'client')));

// === ROUTES ===
// Все /api/* запросы идут к соответствующим роутерам
app.use('/api', coursesRouter);
app.use('/api', bookingsRouter);
app.use('/api', reviewsRouter);
app.use('/api', calculateRouter); 
