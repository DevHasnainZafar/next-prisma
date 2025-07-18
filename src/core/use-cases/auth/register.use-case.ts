import { RegisterRequest, AuthResponse } from "@/core/dtos/auth.dto";
import { IUserRepository } from "@/core/repositories/interfaces/user.repository.interface";
import { hashPassword, createJWT } from "@/shared/utils/auth.utils";

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterRequest): Promise<AuthResponse> {
    const { email, username, password, firstName, lastName } = data;

    const existingUser = await this.userRepository.findByEmailOrUsername(
      email,
      username
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      isActive: true,
    });

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
