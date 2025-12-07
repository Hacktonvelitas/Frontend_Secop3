import { User } from '@/domain/entities/User.entity';
import { IAuthRepository, RegisterData } from '@/domain/repositories/IAuthRepository';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<User> {
    this.validateData(data);
    return await this.authRepository.register(data);
  }

  private validateData(data: RegisterData): void {
    if (!data.email || data.email.trim() === '') {
      throw new Error('El email es requerido');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('El formato del email es inválido');
    }

    if (!data.password || data.password.trim() === '') {
      throw new Error('La contraseña es requerida');
    }

    if (data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (!data.nombre_completo || data.nombre_completo.trim() === '') {
      throw new Error('El nombre es requerido');
    }

    if (!data.empresa_nit || data.empresa_nit.trim() === '') {
      throw new Error('El NIT de la empresa es requerido');
    }
  }
}
