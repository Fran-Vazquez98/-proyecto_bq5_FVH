const express = require('express');
const oracledb = require('oracledb');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();

// CONFIGURACIÓN DE CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

//CONFIGURACIÓN DE CONEXIÓN A ORACLE
const dbConfig = {
  user: "WHISKY",          
  password: "whisky",    
  connectString: "localhost:1521/XEPDB1" 
};

//RUTAS DE LA API
app.get('/api/whiskies', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Consulta SQL con JOIN para traer datos de las 3 tablas
    const sql = `
      SELECT 
        w.ID_WHISKY, 
        w.NOMBRE, 
        w.TIPO, 
        w.EDAD, 
        w.IMAGEN,
        m.NOMBRE AS MARCA, 
        m.PAIS_ORIGEN,
        c.SABOR, 
        c.AROMA, 
        c.GRADO_ALCOHOLICO, 
        c.COLOR
      FROM WHISKY w
      JOIN MARCA m ON w.ID_MARCA = m.ID_MARCA
      LEFT JOIN CARACTERISTICA c ON w.ID_WHISKY = c.ID_WHISKY
      ORDER BY w.ID_WHISKY ASC
    `;

    const result = await connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    res.json(result.rows);

  } catch (err) {
    console.error("Error en BD:", err);
    res.status(500).json({ mensaje: "Error al consultar la base de datos", detalle: err.message });
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) { console.error(e); }
    }
  }
});

/**
 * GET: Buscar whisky por nombre 
 * También con JOIN para que los resultados de búsqueda tengan marca y detalles
 */
app.get('/api/whiskies/nombre/:termino', async (req, res) => {
  let connection;
  const { termino } = req.params;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    const sql = `
      SELECT 
        w.ID_WHISKY, w.NOMBRE, w.TIPO, w.EDAD, 
        m.NOMBRE AS MARCA, m.PAIS_ORIGEN,
        c.SABOR, c.AROMA, c.GRADO_ALCOHOLICO
      FROM WHISKY w
      JOIN MARCA m ON w.ID_MARCA = m.ID_MARCA
      LEFT JOIN CARACTERISTICAS c ON w.ID_WHISKY = c.ID_WHISKY
      WHERE UPPER(w.NOMBRE) LIKE UPPER(:busqueda)
    `;

    const result = await connection.execute(
      sql, 
      { busqueda: `%${termino}%` }, 
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ mensaje: "Error en la búsqueda", detalle: err.message });
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) { console.error(e); }
    }
  }
});

//CONFIGURACIÓN HTTPS
const opciones = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(opciones, app).listen(3000, () => {
  console.log('----------------------------------------------------');
  console.log('SERVIDOR WHISKY CORRIENDO');
  console.log('URL: https://localhost:3000/api/whiskies');
  console.log('----------------------------------------------------');
});