import { NextRequest } from "next/server";
import { AuthService } from "../services/auth.service";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { errorResponse, successResponse } from "@/shared/utils/response.utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(request: NextRequest) {
    try {
      const body = await request.json();
      const validation = LoginDto.safeParse(body);
      if (!validation.success) {
        return errorResponse("Invalid input data", 400);
      }
      const result = await this.authService.login(validation.data);
      return successResponse(result, "Login successful");
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Login failed",
        401
      );
    }
  }
  async register(request: NextRequest) {
    try {
      const body = await request.json();

      const validation = RegisterDto.safeParse(body);
      if (!validation.success) {
        return errorResponse("Invalid input data", 400);
      }

      const result = await this.authService.register(validation.data);
      return successResponse(result, "Registration successful");
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Registration failed",
        400
      );
    }
  }
}
