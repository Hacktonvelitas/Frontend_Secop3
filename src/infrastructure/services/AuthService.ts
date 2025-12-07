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
  grant_type?: string;
}

export class AuthService {
  async register(payload: RegisterPayload): Promise<any> {
    try {
      console.log('Enviando al backend:', payload);

      const response = await fetch('http://98.81.137.170:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Respuesta del backend - Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Error del backend:', errorData);
        const errorMessage = errorData.detail || errorData.message || 'Error en el registro';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Respuesta exitosa del backend:', data);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(payload: LoginPayload): Promise<any> {
    try {
      console.log('Enviando al backend - Login:', payload);

      const formData = new URLSearchParams();
      formData.append('username', payload.username);
      formData.append('password', payload.password);
      if (payload.grant_type) {
        formData.append('grant_type', payload.grant_type);
      }

      console.log('FormData:', formData.toString());

      const response = await fetch('http://98.81.137.170:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      console.log('Respuesta del backend Login - Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Error del backend Login:', errorData);
        const errorMessage = errorData.detail || errorData.message || 'Error en el inicio de sesión';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Respuesta exitosa del backend Login:', data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
