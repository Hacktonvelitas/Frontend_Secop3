export interface ResumenEstado {
  total_documentos: number;
  aprobados: number;
  pendientes: number;
  requiere_accion: number;
  vencidos?: number;
}
