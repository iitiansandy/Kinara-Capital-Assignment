const express = require('express');
const router = express.Router();

const { addStudent, getStudents, searchStudent } = require('../../controllers/studentController');

router.post("/api/v1/addStudent", addStudent);

router.get("/api/v1/getStudents/:pageNumber/:count", getStudents);

router.post("/api/v1/search", searchStudent);

module.exports = router;