const express = require('express');
const cors = require('cors'); // Requisito 2.3 
const oracledb = require('oracledb');
require('dotenv').config();

const app = express();
app.use(cors()); // Habilitar CORS para que Angular pueda conectar 
app.use(express.json());

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

//Todo el catálogo [cite: 19]
app.get('/api/whiskies', async (req, res) => {
    // ... (el código que ya teníamos)
});

//Buscar por NOMBRE 
app.get('/api/whiskies/nombre/:nombre', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        const result = await conn.execute(
            `SELECT * FROM whisky WHERE UPPER(nombre) LIKE UPPER(:nombre)`,
            [`%${req.params.nombre}%`], 
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error de conexión" }); 
    } finally {
        if (conn) await conn.close();
    }
});

//Buscar por CATEGORÍA
app.get('/api/whiskies/categoria/:tipo', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        const result = await conn.execute(
            `SELECT * FROM whisky WHERE UPPER(tipo) = UPPER(:tipo)`,
            [req.params.tipo],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error de conexión" });
    } finally {
        if (conn) await conn.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));