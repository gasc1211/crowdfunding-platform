import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define las rutas protegidas
const isProtectedRoute = createRouteMatcher([
  '/dashboard/inversor',
  '/dashboard/emprendedores',
  '/dashboard/profileInversor',
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();

    // Si el usuario no está autenticado, redirigir a una URL absoluta
    if (!userId) {
      const signInUrl = new URL('/auth/sign-in', req.url); // Construir URL absoluta
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Excluir archivos internos y estáticos de Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Siempre ejecutar en rutas API
    "/(api|trpc)(.*)",
  ],
};
