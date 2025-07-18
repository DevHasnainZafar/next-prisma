import { UserResponse } from "@/core/dtos/user.dto";
import { IUserRepository } from "@/core/repositories/interfaces/user.repository.interface";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
