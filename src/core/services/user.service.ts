import { UpdateUserRequest, UserResponse } from "@/core/dtos/user.dto";
import { UserRepository } from "@/core/repositories/user.repository";
import { GetUsersUseCase } from "@/core/use-cases/users/get-users.use-case";
import { GetUserUseCase } from "@/core/use-cases/users/get-user.use-case";
import { UpdateUserUseCase } from "@/core/use-cases/users/update-user.use-case";

export class UserService {
  private userRepository: UserRepository;
  private getUsersUseCase: GetUsersUseCase;
  private getUserUseCase: GetUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;

  constructor() {
    this.userRepository = new UserRepository();
    this.getUsersUseCase = new GetUsersUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
  }

  async getUsers(): Promise<UserResponse[]> {
    return await this.getUsersUseCase.execute();
  }

  async getUser(id: string): Promise<UserResponse> {
    return await this.getUserUseCase.execute(id);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserResponse> {
    return await this.updateUserUseCase.execute(id, data);
  }
}
