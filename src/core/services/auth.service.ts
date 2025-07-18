import { AuthResponse, LoginRequest, RegisterRequest } from "../dtos/auth.dto";
import { UserRepository } from "../repositories/user.repository";
import { LoginUseCase } from "../use-cases/auth/login.use-case";
import { RegisterUseCase } from "../use-cases/auth/register.use-case";

export class AuthService {
  private userRepository: UserRepository;
  private loginUseCase: LoginUseCase;
  private registerUseCase: RegisterUseCase;

  constructor() {
    this.userRepository = new UserRepository();
    this.loginUseCase = new LoginUseCase(this.userRepository);
    this.registerUseCase = new RegisterUseCase(this.userRepository);
  }
  async login(data: LoginRequest): Promise<AuthResponse> {
    return await this.loginUseCase.execute(data);
  }
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return await this.registerUseCase.execute(data);
  }
}
