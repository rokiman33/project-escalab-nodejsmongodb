const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
require("dotenv").config();

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();
app.use(cors())

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));

// port
const port = process.env.PORT || 8400;

app.listen(port,() => {
    console.log('El servidor esta corriendo perfectamente ${port}')
})
