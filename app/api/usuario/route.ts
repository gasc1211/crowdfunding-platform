import { NextResponse } from 'next/server';
import { getDataUser } from "@/utils/supabase/user";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json({ message: 'NO ES EL METODO QUE SE REQUIERE' });
    }

    const userActual = await currentUser();

    let emailUserActual: string | null = "";

    if (userActual) {
      emailUserActual = userActual.username;
    } else {
      return NextResponse.json({ message: 'USUARIO NO AUTENTICADO' });
    }

    const dataUser = await getDataUser(emailUserActual);

    if (!dataUser) {
      return NextResponse.json({ message: 'USUARIO NO ENCONTRADO' });
    }

    return NextResponse.json(dataUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'ERROR DEL SISTEMA' });
  }
}
