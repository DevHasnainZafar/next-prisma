import { UserController } from "@/core/controllers/user.controller";
import { NextRequest } from "next/server";

const userController = new UserController();

export async function GET(request: NextRequest) {
  return userController.getUsers(request);
}
