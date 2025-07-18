import { AuthResponse, LoginRequest } from "@/core/dtos/auth.dto";
import { IUserRepository } from "@/core/repositories/interfaces/user.repository.interface";
import { createJWT, verifyPassword } from "@/shared/utils/auth.utils";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginRequest): Promise<AuthResponse> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    const token = await createJWT({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
      },
    };
  }
}
