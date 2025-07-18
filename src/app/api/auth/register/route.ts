import { NextRequest } from "next/server";
import { AuthController } from "@/core/controllers/auth.controller";

const authController = new AuthController();

export async function POST(request: NextRequest) {
  return authController.register(request);
}
