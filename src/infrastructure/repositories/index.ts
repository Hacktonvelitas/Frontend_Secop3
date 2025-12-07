import { LicitacionRepositoryMock } from './LicitacionRepositoryMock';
import { DocumentoRepositoryMock } from './DocumentoRepositoryMock';
import { NotificacionRepositoryMock } from './NotificacionRepositoryMock';
import { LicitacionService } from '../services/LicitacionService';

// Initialize services
const licitacionService = new LicitacionService();

// Initialize repositories with their dependencies
export const licitacionRepository = new LicitacionRepositoryMock(licitacionService);
export const documentoRepository = new DocumentoRepositoryMock();
export const notificacionRepository = new NotificacionRepositoryMock();

export { LicitacionRepositoryMock, DocumentoRepositoryMock, NotificacionRepositoryMock };
