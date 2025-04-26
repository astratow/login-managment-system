import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    options: { encrypt: true },
  };

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT name FROM sys.procedures`;
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
}