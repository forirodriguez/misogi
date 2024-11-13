import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Obtén la ruta actual
    const path = req.nextUrl.pathname;

    // Obtén el token (usuario autenticado)
    const token = req.nextauth.token;

    // Rutas públicas (no requieren autenticación)
    const publicRoutes = ["/", "/auth/login", "/auth/register"];

    // Rutas que requieren no estar autenticado
    const authRoutes = ["/auth/login", "/auth/register"];

    // Si el usuario está autenticado y trata de acceder a rutas de auth
    if (token && authRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Si el usuario no está autenticado y trata de acceder a rutas protegidas
    if (!token && !publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Retorna true si la ruta debe ser manejada por el middleware
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized: ({ token }) => true,
    },
  }
);

// Configura las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
