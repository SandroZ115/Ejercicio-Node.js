require('dotenv').config();
const express = require('express');
const { poolPromise } = require('./db');
const routes = require('./routes');
const { logger, noEncontrado, errores } = require('./middleware');

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api/productos', routes);
app.use(noEncontrado);
app.use(errores);

const PORT = process.env.PORT || 3000;

poolPromise
    .then(() => {
        console.log('Conectado a SQL Server');
        app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Error de conexión a la BD:', err.message);
        process.exit(1);
    });