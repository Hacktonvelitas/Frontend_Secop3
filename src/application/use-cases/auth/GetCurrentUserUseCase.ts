import { User } from '@/domain/entities/User.entity';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<User | null> {
    return await this.authRepository.getCurrentUser();
  }
}
