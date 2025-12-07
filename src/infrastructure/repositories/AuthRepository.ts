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

    return {
      id: response.user.id,
      email: response.user.email,
      nombre: response.user.name,
      rol: 'usuario',
      empresa: {
        razonSocial: 'Empresa Demo', // Mock data since login might not return full company details in this simple mock
        nit: '999999999',
        sector: 'Tecnología'
      }
    };
  }

  async logout(): Promise<void> {
    // Mock logout
    return Promise.resolve();
  }

  async register(data: RegisterData): Promise<User> {
    const payload = {
      email: data.email,
      nombre_completo: data.nombre,
      empresa_nit: data.nit || "123", // Default to "123" as requested
      is_active: true,
      password: data.password
    };

    const response = await this.authService.register(payload);

    return {
      id: response.user.id,
      email: response.user.email,
      nombre: response.user.name,
      rol: 'usuario',
      empresa: {
        razonSocial: data.nombreEmpresa, // From input data
        nit: payload.empresa_nit,
        sector: 'Sin sector' // Default
      }
    };
  }

  async getCurrentUser(): Promise<User | null> {
      return null;
  }
}
