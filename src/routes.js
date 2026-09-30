const router = require('express').Router();
const { sql, run } = require('./db');
const { validarProducto } = require('./middleware');

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const datos = (b) => ({
    nombre: [sql.NVarChar(100), b.nombre],
    descripcion: [sql.NVarChar(sql.MAX), b.descripcion ?? null],
    precio: [sql.Decimal(10, 2), b.precio],
    stock: [sql.Int, b.stock ?? 0],
});

router.get('/', wrap(async (req, res) => {
    const { recordset } = await run('SELECT * FROM productos ORDER BY id');
    res.json(recordset);
}));

router.get('/:id', wrap(async (req, res) => {
    const { recordset } = await run('SELECT * FROM productos WHERE id = @id', {
        id: [sql.Int, req.params.id],
    });
    if (!recordset.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(recordset[0]);
}));

router.post('/', validarProducto, wrap(async (req, res) => {
    const { recordset } = await run(
        `INSERT INTO productos (nombre, descripcion, precio, stock)
     OUTPUT INSERTED.*
     VALUES (@nombre, @descripcion, @precio, @stock)`,
        datos(req.body)
    );
    res.status(201).json(recordset[0]);
}));

router.put('/:id', validarProducto, wrap(async (req, res) => {
    const { recordset } = await run(
        `UPDATE productos
     SET nombre=@nombre, descripcion=@descripcion, precio=@precio, stock=@stock
     OUTPUT INSERTED.*
     WHERE id=@id`,
        { ...datos(req.body), id: [sql.Int, req.params.id] }
    );
    if (!recordset.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(recordset[0]);
}));

router.delete('/:id', wrap(async (req, res) => {
    const { rowsAffected } = await run('DELETE FROM productos WHERE id = @id', {
        id: [sql.Int, req.params.id],
    });
    if (!rowsAffected[0]) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(204).send();
}));

module.exports = router;