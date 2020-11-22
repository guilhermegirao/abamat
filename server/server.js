/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`🔥 Server running at port ${port}`));
