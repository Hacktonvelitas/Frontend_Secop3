import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { User } from '@/domain/entities/User.entity';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    return this.authRepository.login(email, password);
  }
}
