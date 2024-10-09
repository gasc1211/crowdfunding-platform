// /app/api/test-connection/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()'); // Consulta simple para verificar la conexión
    return NextResponse.json({ connected: true, time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
  }
}

