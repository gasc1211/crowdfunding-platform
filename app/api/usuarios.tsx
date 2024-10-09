import { NextApiRequest, NextApiResponse } from 'next'; // Importar tipos para las solicitudes y respuestas
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
