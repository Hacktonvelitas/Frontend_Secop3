export interface RegisterPayload {
  email: string;
  nombre_completo: string;
  empresa_nit: string;
  is_active: boolean;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export class AuthService {
  async register(payload: RegisterPayload): Promise<any> {
    try {
      const response = await fetch('http://98.81.137.170:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(payload: LoginPayload): Promise<any> {
    try {
      const response = await fetch('http://98.81.137.170:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
