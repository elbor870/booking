const fs = require('fs');
const path = require('path');

// Путь к файлу с данными
const DATA_PATH = path.join(__dirname, '..', 'data', 'courses.json');

/**
 * Читает список курсов из JSON-файла.
 * @returns {Array} массив курсов
 */
function readCourses() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Ошибка чтения courses.json:', err.message);
    return [];
  }
}

/**
 * GET /api/courses
 * Возвращает список всех курсов.
 */
exports.getAllCourses = (req, res) => {
  const courses = readCourses();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
};

/**
 * GET /api/courses/:id
 * Возвращает конкретный курс по id.
 */
exports.getCourseById = (req, res) => {
  const id = Number(req.params.id);

  // Проверка корректности id
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: true,
      message: 'Некорректный id курса. Ожидается положительное число.',
      field: 'id'
    });
  }

  const courses = readCourses();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({
      error: true,
      message: `Курс с id=${id} не найден`,
      field: 'id'
    });
  }

  res.status(200).json({
    success: true,
    data: course
  });
};
