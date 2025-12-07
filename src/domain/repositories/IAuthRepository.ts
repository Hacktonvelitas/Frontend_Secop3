import { User } from '../entities/User.entity';

export interface RegisterData {
  email: string;
  nombre_completo: string;
  empresa_nit: string;
  is_active: boolean;
  password: string;
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  register(data: RegisterData): Promise<User>;
  getCurrentUser(): Promise<User | null>;
}
