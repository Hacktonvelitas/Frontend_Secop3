import { IAuthRepository, RegisterData } from '@/domain/repositories/IAuthRepository';
import { User } from '@/domain/entities/User.entity';
import { AuthService } from '@/infrastructure/services/AuthService';

export class AuthRepository implements IAuthRepository {
  constructor(private readonly authService: AuthService) {}

  async login(email: string, password: string): Promise<User> {
    const payload = {
      username: email,
      password: password
    };

    const response = await this.authService.login(payload);

    console.log('Response en AuthRepository.login:', response);

    return {
      id: response.user?.id?.toString() || response.id?.toString() || '0',
      email: response.user?.email || response.email || email,
      nombre: response.user?.name || response.user?.nombre_completo || response.nombre_completo || 'Usuario',
      rol: 'usuario',
      empresa: {
        razonSocial: response.user?.empresa_nit || response.empresa_nit || 'Empresa',
        nit: response.user?.empresa_nit || response.empresa_nit || '000000000',
        sector: 'Tecnología'
      }
    };
  }

  async logout(): Promise<void> {
    // Mock logout
    return Promise.resolve();
  }

  async register(data: RegisterData): Promise<User> {
    const response = await this.authService.register(data);

    return {
      id: response.id?.toString() || '0',
      email: response.email || data.email,
      nombre: response.nombre_completo || data.nombre_completo,
      rol: 'usuario',
      empresa: {
        razonSocial: data.empresa_nit,
        nit: data.empresa_nit,
        sector: 'Sin sector'
      }
    };
  }

  async getCurrentUser(): Promise<User | null> {
      return null;
  }
}
