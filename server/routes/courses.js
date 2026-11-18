const express = require('express');
const { getAllCourses, getCourseById } = require('../controllers/coursesController');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;
