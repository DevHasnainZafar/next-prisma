import { UserController } from "@/core/controllers/user.controller";
import { NextRequest } from "next/server";

const userController = new UserController();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.getUser(request, params.id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.updateUser(request, params.id);
}
