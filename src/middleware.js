const logger = (req, res, next) => {
    const inicio = Date.now();
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - inicio}ms`);
    });
    next();
};

const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;
    if (!nombre || typeof nombre !== 'string')
        return res.status(400).json({ error: 'nombre es requerido' });
    if (precio === undefined || isNaN(precio) || precio < 0)
        return res.status(400).json({ error: 'precio inválido' });
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0))
        return res.status(400).json({ error: 'stock inválido' });
    next();
};

const noEncontrado = (req, res) => res.status(404).json({ error: 'Ruta no encontrada' });

const errores = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = { logger, validarProducto, noEncontrado, errores };