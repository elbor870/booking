const fs = require('fs');
const path = require('path');

const COURSES_FILE = path.join(__dirname, '..', 'data', 'courses.json');

function readCourses() {
  const raw = fs.readFileSync(COURSES_FILE, 'utf8');
  const courses = JSON.parse(raw);
  if (!Array.isArray(courses)) {
    throw new Error('courses.json должен содержать массив');
  }
  return courses;
}

function getAllCourses(req, res) {
  try {
    res.json(readCourses());
  } catch (err) {
    console.error('Ошибка чтения courses.json:', err.message);
    res.status(500).json({ error: 'Не удалось получить список курсов' });
  }
}

function getCourseById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'id должен быть положительным целым числом' });
  }

  try {
    const course = readCourses().find((item) => item.id === id);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json(course);
  } catch (err) {
    console.error('Ошибка чтения courses.json:', err.message);
    res.status(500).json({ error: 'Не удалось получить курс' });
  }
}

module.exports = { getAllCourses, getCourseById };
