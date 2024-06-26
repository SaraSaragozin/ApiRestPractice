const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Student data (for demonstration)
let students = [
    { id: 1, name: 'Alice', age: 20, grade: 'A' },
    { id: 2, name: 'Bob', age: 21, grade: 'B' },
];

/**
 * @openapi
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     responses:
 *       '200':
 *         description: A list of students
 */
app.get('/students', (req, res) => {
    res.json(students);
});

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numeric ID of the student to get
 *     responses:
 *       '200':
 *         description: Student details
 *       '404':
 *         description: Student not found
 */
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

/**
 * @openapi
 * /students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               grade:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 */
app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = { id: students.length + 1, name, age, grade };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

/**
 * @openapi
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numeric ID of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               grade:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated
 *       '404':
 *         description: Student not found
 */
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, grade } = req.body;
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { id, name, age, grade };
        res.json({ message: 'Student updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numeric ID of the student to delete
 *     responses:
 *       '200':
 *         description: Deleted
 *       '404':
 *         description: Student not found
 */
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
