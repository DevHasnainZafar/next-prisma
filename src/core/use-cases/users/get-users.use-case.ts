import { UserResponse } from '@/core/dtos/user.dto'
import { IUserRepository } from '@/core/repositories/interfaces/user.repository.interface'

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserResponse[]> {
    return await this.userRepository.findAll()
  }
}