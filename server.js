const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
});
