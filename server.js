const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(cors());

// MySQL Connection Pool
const db = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release(); 
  }
});
// Create
app.post('/api/create', (req, res) => {
  const { Name, Age } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (Name, Age) VALUES ('${Name}', '${Age}')`;
  db.query(INSERT_USER_QUERY, (err, result) => {
    if (err) throw err;
    res.send('User added successfully');
  });
});

// GetAll
app.get('/api/users', (req, res) => {
  const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';
  db.query(SELECT_ALL_USERS_QUERY, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

  // GetById
  app.get('/api/users/:Id', (req, res) => {
    const Id = req.params.Id;
    const SELECT_ALL_USERS_QUERY = `SELECT * FROM users Where Id = ${Id}`;
    db.query(SELECT_ALL_USERS_QUERY, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

// Update
app.put('/api/update/:Id', (req, res) => {
  const Id = req.params.Id;
  const { age, name } = req.body;
  const UPDATE_USER_QUERY = `UPDATE users SET Name='${name}', Age='${age}' WHERE Id=${Id}`;
  db.query(UPDATE_USER_QUERY, (err, result) => {
    if (err) throw err;
    res.send('User updated successfully');
  });
});


// Delete
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const DELETE_USER_QUERY = `DELETE FROM users WHERE id=${id}`;
  db.query(DELETE_USER_QUERY, (err, result) => {
    if (err) throw err;
    res.send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
