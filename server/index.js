const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

/* ============================================================
 * MIDDLEWARE
 * ============================================================ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

/* ============================================================
 * СТАТИКА
 * ============================================================ */
const CLIENT_DIR = path.join(__dirname, '..', 'client');
app.use(express.static(CLIENT_DIR));

/* ============================================================
 * API-РОУТЫ
 * ============================================================ */

// --- Курсы (Агизов И.Д.) ---
const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

// --- Записи (Выдрина В.И.) --- раскомментировать, когда будет готово:
// const bookingsRouter = require('./routes/bookings');
// app.use('/api/bookings', bookingsRouter);

// --- Отзывы (Грищенко Р.А.) --- раскомментировать, когда будет готово:
// const reviewsRouter = require('./routes/reviews');
// app.use('/api/reviews', reviewsRouter);

/* ============================================================
 * СЛУЖЕБНЫЕ ЭНДПОИНТЫ
 * ============================================================ */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ============================================================
 * 404
 * ============================================================ */
app.use('/api', (req, res) => {
  res.status(404).json({
    error: true,
    message: `Эндпоинт ${req.method} ${req.originalUrl} не найден`,
    field: null
  });
});

app.use((req, res) => {
  const notFoundPage = path.join(CLIENT_DIR, '404.html');
  if (fs.existsSync(notFoundPage)) {
    return res.status(404).sendFile(notFoundPage);
  }
  res.status(404).send('<h1>404 — Страница не найдена</h1>');
});

/* ============================================================
 * 500
 * ============================================================ */
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({
    error: true,
    message: 'Внутренняя ошибка сервера',
    field: null
  });
});

/* ============================================================
 * ЗАПУСК
 * ============================================================ */
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log(`   API курсов:    http://localhost:${PORT}/api/courses`);
  console.log(`   Health-check:  http://localhost:${PORT}/api/health`);
});
