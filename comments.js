// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');                                                                  
const cors = require('cors');
const comments = require('./comments.json'); // Assuming comments.json is in the same directory
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));
// Endpoint to get comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});
// Endpoint to add a comment
app.post('/api/comments', (req, res) => {
  const newComment = req.body;
  if (!newComment || !newComment.author || !newComment.text) {
    return res.status(400).json({ error: 'Invalid comment data' });
  }
  comments.push(newComment);
  res.status(201).json(newComment);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Export the app for testing purposes
module.exports = app;
// This code sets up a simple Express server that serves comments from a JSON file
// and allows adding new comments via a POST request. It also serves static files from a 'public' directory.
// The server listens on port 3000 and uses CORS to allow cross-origin requests.
// The comments are expected to be in a JSON file named 'comments.json' in the same directory as this script.           
