const express = require('express');
const fs = require('fs').promises;
const xlsx = require('xlsx');
const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
