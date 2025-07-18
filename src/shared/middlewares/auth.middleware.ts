import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "../utils/auth.utils";
import { errorResponse } from "../utils/response.utils";

export async function authMiddleware(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }

  return NextResponse.next();
}

export async function adminMiddleware(request: NextRequest) {
  const user = await getUserFromRequest(request);

  if (!user || user.role !== "ADMIN") {
    return errorResponse("Forbidden", 403);
  }

  return NextResponse.next();
}
