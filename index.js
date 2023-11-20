const express = require('express');
const figlet = require('figlet');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Set up a simple route
app.get('/', (req, res) => {
  // Render the input form
  res.send(`
    <html>
      <head>
        <title>ASCII Art Generator</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
      </head>
      <body>
        <h1>ASCII Art Generator</h1>
        <form action="/" method="post">
          <label for="inputSentence">Enter a Sentence:</label>
          <input type="text" id="inputSentence" name="inputSentence" required>
          <button type="submit">Generate ASCII Art</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the form submission
app.post('/', (req, res) => {
  const inputSentence = req.body.inputSentence;

  // Use Figlet to generate ASCII art from the user's input
  figlet(inputSentence, (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }

    // Render the ASCII art
    res.send(`
      <html>
        <head>
          <title>ASCII Art Generator</title>
          <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body>
          <h1>ASCII Art Generator</h1>
          <form action="/" method="post">
            <label for="inputSentence">Enter a Sentence:</label>
            <input type="text" id="inputSentence" name="inputSentence" value="${inputSentence}" required>
            <button type="submit">Generate ASCII Art</button>
          </form>
          <div>
            <pre>${data}</pre>
          </div>
        </body>
      </html>
    `);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
