import { UpdateUserRequest, UserResponse } from "@/core/dtos/user.dto";
import { IUserRepository } from "@/core/repositories/interfaces/user.repository.interface";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserRequest): Promise<UserResponse> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userRepository.update(id, data);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
