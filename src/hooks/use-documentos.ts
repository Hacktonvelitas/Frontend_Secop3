import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentoRepository } from '@/infrastructure/repositories';
import {
  GetDocumentosUseCase,
  GetDocumentosByLicitacionUseCase,
  UpdateDocumentoEstadoUseCase,
  GetResumenEstadoUseCase,
} from '@/application/use-cases/documentos';
import { Documento } from '@/domain/entities/Documento.entity';

const getDocumentosUseCase = new GetDocumentosUseCase(documentoRepository);
const getDocumentosByLicitacionUseCase = new GetDocumentosByLicitacionUseCase(documentoRepository);
const updateDocumentoEstadoUseCase = new UpdateDocumentoEstadoUseCase(documentoRepository);
const getResumenEstadoUseCase = new GetResumenEstadoUseCase(documentoRepository);

export function useDocumentos() {
  return useQuery({
    queryKey: ['documentos'],
    queryFn: () => getDocumentosUseCase.execute(),
  });
}

export function useDocumentosByLicitacion(licitacionId: string) {
  return useQuery({
    queryKey: ['documentos', 'licitacion', licitacionId],
    queryFn: () => getDocumentosByLicitacionUseCase.execute(licitacionId),
    enabled: !!licitacionId,
  });
}

export function useResumenEstado() {
  return useQuery({
    queryKey: ['documentos', 'resumen'],
    queryFn: () => getResumenEstadoUseCase.execute(),
  });
}

export function useUpdateDocumentoEstado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: Documento['estado'] }) =>
      updateDocumentoEstadoUseCase.execute(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentos'] });
    },
  });
}
