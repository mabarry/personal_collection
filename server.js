const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about-me.html'));
});

app.get('/records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'records.html'));
});

app.get('/videogames', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'videogames.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});