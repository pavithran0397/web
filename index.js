const express = require('express');
const fs = require('fs').promises;
const xlsx = require('xlsx');
const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist'))); 

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

app.get('/dist/bundle.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
