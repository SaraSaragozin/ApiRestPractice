# ApiRestPractice

This is a simple REST API application built with Node.js and Express, documented using Swagger. It allows managing student records through CRUD operations.
This aplication was development by students: 
            Nexar Salguero and Sara Saragozin

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SaraSaragozin/ApiRestPractice.git
   cd ApiRestPractice

2. **Install Dependencies:**
    npm install


3. **Start the Server:**

node server.js
The server will start running at http://localhost:3000. //the port 3000 is an example

# API Documentation (Swagger)
Once the server is running, you can access the Swagger UI documentation at:

http://localhost:3000/api-docs

this show all available endpoints and interact with the API directly from the Swagger UI.

# How to use 

1. **Retrieve All Students**
Endpoint: GET /students

curl http://localhost:3000/students
This will return a list of all students in JSON format.

2. **Retrieve a Student by ID**
Endpoint: GET /students/{id}

Replace {id} with the ID of the student you want to retrieve.

curl http://localhost:3000/students/1
This will return the details of the student with ID 1.