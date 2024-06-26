const express = require('express');
const router = express.Router();

// Simulated student data (for demonstration purposes)
let students = [
    { id: 1, name: 'Student A', age: 20, grade: 'A' },
    { id: 2, name: 'Student B', age: 21, grade: 'B' },
];

// API Routes
router.get('/students', (req, res) => {
    res.json(students);
});

router.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = { id: students.length + 1, name, age, grade };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

router.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

module.exports = router;
