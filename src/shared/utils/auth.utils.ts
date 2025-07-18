import bcrypt from "bcryptjs";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}
export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as JWTPayload;
}

export async function getUserFromRequest(
  request: NextRequest
): Promise<JWTPayload | null> {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return null;

    return await verifyJWT(token);
  } catch {
    return null;
  }
}
