const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const indexRoutes = require('./src/routes/index'); 

const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/api', indexRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
