import { NextRequest } from "next/server";
import { UserService } from "@/core/services/user.service";
import { UpdateUserDto } from "@/core/dtos/user.dto";
import { successResponse, errorResponse } from "@/shared/utils/response.utils";
import { getUserFromRequest } from "@/shared/utils/auth.utils";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(request: NextRequest) {
    try {
      const user = await getUserFromRequest(request);
      if (!user) {
        return errorResponse("Unauthorized", 401);
      }

      const result = await this.userService.getUsers();
      return successResponse(result);
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Failed to fetch users",
        500
      );
    }
  }

  async getUser(request: NextRequest, id: string) {
    try {
      const user = await getUserFromRequest(request);
      if (!user) {
        return errorResponse("Unauthorized", 401);
      }

      const result = await this.userService.getUser(id);
      return successResponse(result);
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "User not found",
        404
      );
    }
  }

  async updateUser(request: NextRequest, id: string) {
    try {
      const user = await getUserFromRequest(request);
      if (!user) {
        return errorResponse("Unauthorized", 401);
      }
      if (user.userId !== id) {
        return errorResponse("Forbidden", 403);
      }

      const body = await request.json();
      const validation = UpdateUserDto.safeParse(body);
      if (!validation.success) {
        return errorResponse("Invalid input data", 400);
      }

      const result = await this.userService.updateUser(id, validation.data);
      return successResponse(result, "User updated successfully");
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Failed to update user",
        500
      );
    }
  }
}
