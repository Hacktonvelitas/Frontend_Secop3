import { User } from '../entities/User.entity';

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  nombreEmpresa: string;
  nit?: string; // Optional now, since form doesn't strictly require it (or it's auto-filled)
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  register(data: RegisterData): Promise<User>;
  getCurrentUser(): Promise<User | null>;
}
