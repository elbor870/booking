const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

// GET /api/courses — список всех курсов
router.get('/', coursesController.getAllCourses);

// GET /api/courses/:id — конкретный курс
router.get('/:id', coursesController.getCourseById);

module.exports = router;
