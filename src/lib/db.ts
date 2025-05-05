import * as sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export default async function executeStoredProc(
  procName: string,
  inputParams: { name: string; type: sql.ISqlType; value: string | number | boolean | Date | null }[] = []
) {
  const pool = new sql.ConnectionPool(config);
  const poolConnect = pool.connect();

  try {
    await poolConnect;
    const request = pool.request();
    inputParams.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.execute(procName);
    return result;
  } catch (err) {
    console.error('SQL error:', err);
    throw err;
  } finally {
    await pool.close(); 
  }
}