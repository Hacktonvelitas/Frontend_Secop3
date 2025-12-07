export interface User {
  id: string;
  email: string;
  nombre: string;
  empresa: {
    razonSocial: string;
    nit: string;
    sector: string;
  };
  rol: 'admin' | 'usuario';
}

export type UserRol = User['rol'];
