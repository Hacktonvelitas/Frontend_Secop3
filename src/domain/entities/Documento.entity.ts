export interface Documento {
  id: string;
  nombre: string;
  categoria: string;
  estado: 'aprobado' | 'pendiente' | 'vencido' | 'rechazado' | 'cargado' | 'requiere_accion';
  observaciones: string | null;
  fecha_carga: string | null;
}

export type DocumentoCategoria = Documento['categoria'];
export type DocumentoEstado = Documento['estado'];
