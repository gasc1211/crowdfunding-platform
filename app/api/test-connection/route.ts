// /app/api/test-connection/route.ts
/* import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()'); // Consulta simple para verificar la conexión
    return NextResponse.json({ connected: true, time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
  }
}
 */

import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  try {
    console.log(supabase); // Log to verify if the Supabase client is defined

    const { data, error } = await supabase
      .from('usuario') // Replace 'usuario' with your table name
      .select('*');

    if (error) throw error;

    return NextResponse.json({ connected: true, data });
  } catch (error: unknown) { // Explicitly type the error as unknown
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
    }
    // If it's not an Error object, handle it differently
    console.error('An unknown error occurred');
    return NextResponse.json({ connected: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}

