const oracledb = require('oracledb');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING 
};

async function query(sql, binds = [], opts = {}) {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    opts.autoCommit = true; 
    opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
    
    const result = await conn.execute(sql, binds, opts);
    return result;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = { query };