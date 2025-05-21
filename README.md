# Flask To-Do API – Sandbox Project

This project is part of my personal learning journey with Python and Flask.  
It’s a simple RESTful API for managing a to-do list, built using the Flask microframework.  
The goal is to explore backend development, REST principles, and basic CRUD operations.

This is not a production-ready app – it's my sandbox to play with ideas, test things out, and improve my skills.

---

## Features

- Retrieve all tasks (`GET /tasks`)
- Retrieve a single task by ID (`GET /tasks/<id>`)
- Create a new task (`POST /tasks`)
- Update an existing task (`PUT /tasks/<id>`)
- Delete a task (`DELETE /tasks/<id>`)

All data is stored in memory (Python list), so it's reset every time the server restarts.

---

## How to Run

1. Clone the Repository

```bash
git clone --branch Flask-REST-API https://github.com/Qe6i/portfolio.git
cd portfolio
```

2. Create a Virtual Environment (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Dependencies

```bash
pip install Flask
```

4. Run the App

```bash
python app.py
```
The server will start at http://127.0.0.1:5000

---

### Example Requests
- Get all tasks:
```bash
curl http://127.0.0.1:5000/tasks
```
- Add a new task:
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"title": "Nauczyć się Flask"}' \
http://127.0.0.1:5000/tasks
```
- Update a task:
```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"done": true}' \
http://127.0.0.1:5000/tasks/1
```
- Delete a task:
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/1
```

---

### Technologies Used

- Python 3
- Flask (micro web framework)
- REST API concepts
- JSON for data exchange

---

### What's Next?

This is a playground project, but in the future I’d like to:
- Replace in-memory data with SQLite and SQLAlchemy
- Add simple HTML frontend or Swagger UI
- Add basic authentication
- Write tests using `unittest` or `pytest`
