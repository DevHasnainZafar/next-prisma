import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "./shared/utils/auth.utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/api/auth/login", "/api/auth/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log("isPublic", isPublicRoute);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const protectedRoutes = ["/api/users", "/api/posts"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  console.log("isProtected", isProtectedRoute);
  if (isProtectedRoute) {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const response = NextResponse.next();
    response.headers.set("x-user-id", user.userId as string);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
