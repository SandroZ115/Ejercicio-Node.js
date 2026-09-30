require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: { encrypt: false, trustServerCertificate: true },
};

const poolPromise = new sql.ConnectionPool(config).connect();

const run = async (query, params = {}) => {
    const pool = await poolPromise;
    const request = pool.request();
    for (const [name, [type, value]] of Object.entries(params)) request.input(name, type, value);
    return request.query(query);
};

module.exports = { sql, poolPromise, run };