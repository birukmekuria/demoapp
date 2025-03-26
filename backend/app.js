// Import the express module
const express = require("express");
// Import mysql2 module
const mysql = require("mysql2");
// Import the cors module
const cors = require("cors");

// Create an instance of express
const app = express();

// Define the connection parameters for the database
const dbconfig = {
  connectionLimit: 10,
  host: "51.20.250.139",
  user: "buruk",
  password: "password",
  database: "demoapp",
};

// Create a connection pool
const pool = mysql.createPool(dbconfig);

//Connect to the database
pool.getConnection((err, connection) => {
  if (err) {
    console.error("An error occurred while connecting to the database", err);
    throw err;
  }
  console.log("Connected to the database");
  connection.release();
});

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Allow cross-origin requests for all methods
app.use(cors());


// Create a simple get request handler to send a response back to the client
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
  console.log(req.body);
  // Write the SQL query to insert a new employee_test
  const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  // Define the values for the query
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
  ];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("An error occurred while executing the query", err);
      res.status(500).send(err);
      return;
    }
    // Send a success response back to the client
    const response = {
      status: "success",
      message: "Employee added successfully",
      employee: req.body,
    };
    res.status(200).json(response);
  });
});

// Post request handler to login an employee which comes to this route /login
app.post("/login", (req, res) => {
  console.log(req.body);
  // Write the SQL query to retrieve the employee with email and password
  const sql = `SELECT * FROM employee_test WHERE email = ? AND password = ?`;
  // Define the values for the query
  const values = [req.body.email, req.body.password];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("An error occurred while executing the query", err);
      res.status(500).send(err);
      return;
    }
    // Send a success response back to the client
    if (result.length > 0) {
      const response = {
        status: "success",
        message: "Employee login successfully",
        employee: result[0],
      };
      res.status(200).json(response);
    } else {
      const response = {
        status: "error",
        message: "Invalid email or password",
      };
      res.status(401).json(response);
    }
  });
});

// Set up the port to listen on
const port = 4000;
// Set up the listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
