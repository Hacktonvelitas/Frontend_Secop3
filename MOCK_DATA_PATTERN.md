# Patrón de Implementación de Datos Mock

Este documento explica cómo está implementado el sistema de datos mock en el proyecto siguiendo los principios de Clean Architecture.

## Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  (Components/Pages: Borradores.tsx, LicitacionDetail)   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (usa hooks)
┌─────────────────────────────────────────────────────────┐
│                    HOOKS LAYER                           │
│           (use-licitaciones.ts)                          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (llama use cases)
┌─────────────────────────────────────────────────────────┐
│                 APPLICATION LAYER                        │
│    (Use Cases: GetLicitacionesUseCase, etc.)            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (usa interface)
┌─────────────────────────────────────────────────────────┐
│                    DOMAIN LAYER                          │
│  (IDocumentoRepository, ILicitacionRepository)          │
│  (Entities: Documento, Licitacion, ResumenEstado)       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (implementa)
┌─────────────────────────────────────────────────────────┐
│               INFRASTRUCTURE LAYER                       │
│  (DocumentoRepositoryMock, LicitacionRepositoryMock)    │
│  (Mock Data: documentos.data.ts)                        │
└─────────────────────────────────────────────────────────┘
```

## Estructura de Archivos

### 1. Domain Layer (Contratos y Entidades)

#### `src/domain/entities/Documento.entity.ts`
```typescript
export interface Documento {
  id_doc: string;
  nombre: string;
  categoria: string;
  estado: 'aprobado' | 'pendiente' | 'vencido' | 'rechazado' | 'cargado' | 'requiere_accion';
  observaciones: string | null;
  fecha_carga: string | null;
}

export type DocumentoCategoria = Documento['categoria'];
export type DocumentoEstado = Documento['estado'];
```

#### `src/domain/entities/ResumenEstado.entity.ts`
```typescript
export interface ResumenEstado {
  total_documentos: number;
  aprobados: number;
  pendientes: number;
  requiere_accion: number;
  vencidos?: number;
}
```

#### `src/domain/repositories/IDocumentoRepository.ts`
```typescript
import { Documento } from '../entities/Documento.entity';
import { ResumenEstado } from '../entities/ResumenEstado.entity';

export interface IDocumentoRepository {
  getAll(): Promise<Documento[]>;
  getById(id: string): Promise<Documento | null>;
  getByLicitacionId(licitacionId: string): Promise<Documento[]>;
  getResumenEstado(): Promise<ResumenEstado>;
  updateEstado(id: string, estado: Documento['estado']): Promise<Documento>;
}
```

### 2. Infrastructure Layer (Implementación Mock)

#### `src/infrastructure/mock/documentos.data.ts`
```typescript
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';

export const mockDocumentosData: Documento[] = [
  {
    id: '1',
    nombre: 'Registro Único de Proponentes (RUP)',
    categoria: 'juridico',
    estado: 'aprobado',
    observaciones: 'Documento válido hasta diciembre 2024'
  },
  {
    id: '2',
    nombre: 'Certificado de Existencia y Representación Legal',
    categoria: 'juridico',
    estado: 'vencido',
    observaciones: 'La fecha de expedición supera los 30 días permitidos',
    fechaExpedicion: '2023-12-01'
  },
  // ... más documentos
];

export const mockResumenEstadoData: ResumenEstado = {
  total_documentos: 12,
  aprobados: 4,
  pendientes: 4,
  requiere_accion: 2,
  vencidos: 1
};
```

#### `src/infrastructure/repositories/DocumentoRepositoryMock.ts`
```typescript
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';
import { mockDocumentosData, mockResumenEstadoData } from '../mock/documentos.data';

export class DocumentoRepositoryMock implements IDocumentoRepository {
  private documentos: Documento[] = mockDocumentosData;
  private resumenEstado: ResumenEstado = mockResumenEstadoData;

  async getAll(): Promise<Documento[]> {
    return Promise.resolve([...this.documentos]);
  }

  async getById(id: string): Promise<Documento | null> {
    const documento = this.documentos.find(d => d.id === id);
    return Promise.resolve(documento || null);
  }

  async getByLicitacionId(licitacionId: string): Promise<Documento[]> {
    return Promise.resolve([...this.documentos]);
  }

  async getResumenEstado(licitacionId: string): Promise<ResumenEstado> {
    return Promise.resolve({ ...this.resumenEstado });
  }

  async updateEstado(id: string, estado: Documento['estado']): Promise<Documento | null> {
    const documento = this.documentos.find(d => d.id === id);
    if (!documento) {
      return Promise.resolve(null);
    }

    documento.estado = estado;
    return Promise.resolve({ ...documento });
  }
}
```

#### `src/infrastructure/repositories/index.ts`
```typescript
import { LicitacionRepositoryMock } from './LicitacionRepositoryMock';
import { DocumentoRepositoryMock } from './DocumentoRepositoryMock';
import { NotificacionRepositoryMock } from './NotificacionRepositoryMock';

// Instancias singleton de los repositorios
export const licitacionRepository = new LicitacionRepositoryMock();
export const documentoRepository = new DocumentoRepositoryMock();
export const notificacionRepository = new NotificacionRepositoryMock();

export { LicitacionRepositoryMock, DocumentoRepositoryMock, NotificacionRepositoryMock };
```

### 3. Hooks Layer (React Query)

#### `src/hooks/use-licitaciones.ts`
```typescript
import { useQuery } from '@tanstack/react-query';
import { LicitacionService } from '@/infrastructure/services/LicitacionService';
import { LicitacionRepositoryMock } from '@/infrastructure/repositories/LicitacionRepositoryMock';
import {
  GetLicitacionesUseCase,
  GetLicitacionByIdUseCase,
  FilterLicitacionesUseCase,
  type FilterCriteria,
} from '@/application/use-cases/licitaciones';

// Dependency Injection Setup
const licitacionService = new LicitacionService();
const licitacionRepository = new LicitacionRepositoryMock(licitacionService);

const getLicitacionesUseCase = new GetLicitacionesUseCase(licitacionRepository);
const getLicitacionByIdUseCase = new GetLicitacionByIdUseCase(licitacionRepository);
const filterLicitacionesUseCase = new FilterLicitacionesUseCase(licitacionRepository);

export function useLicitaciones() {
  return useQuery({
    queryKey: ['licitaciones'],
    queryFn: () => getLicitacionesUseCase.execute(),
  });
}

export function useLicitacion(id: string) {
  return useQuery({
    queryKey: ['licitacion', id],
    queryFn: () => getLicitacionByIdUseCase.execute(id),
    enabled: !!id,
  });
}

export function useFilterLicitaciones(criteria: FilterCriteria) {
  return useQuery({
    queryKey: ['licitaciones', 'filter', criteria],
    queryFn: () => filterLicitacionesUseCase.execute(criteria),
    enabled: !!(criteria.searchQuery || criteria.sector || criteria.region),
  });
}
```

### 4. Presentation Layer (Uso en Componentes)

#### `src/pages/Borradores.tsx` (Ejemplo simple)
```typescript
import { useMemo } from 'react';
import { LicitacionCard } from '@/components/dashboard/LicitacionCard';
import { TopNav } from '@/components/layout/TopNav';
import { useLicitaciones } from '@/hooks/use-licitaciones';

export default function Borradores() {
    const { data: rawLicitaciones = [], isLoading } = useLicitaciones();

    const borradores = useMemo(() => {
        return rawLicitaciones.filter(l => l.documentosCompletados > 0);
    }, [rawLicitaciones]);

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground tracking-tight p-6 mt-1">
                Mis Borradores <span className="text-muted-foreground font-normal text-base ml-2">({borradores.length})</span>
            </h2>

            {isLoading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Cargando borradores...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {borradores.map((licitacion, index) => (
                        <div key={licitacion.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                            <LicitacionCard licitacion={licitacion} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
```

#### `src/pages/LicitacionDetail.tsx` (Ejemplo complejo con múltiples repositorios)
```typescript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { licitacionRepository, documentoRepository } from '@/infrastructure/repositories';
import { Licitacion } from '@/domain/entities/Licitacion.entity';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';

export default function LicitacionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [licitacion, setLicitacion] = useState<Licitacion | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [resumenEstado, setResumenEstado] = useState<ResumenEstado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        // Llamadas paralelas a múltiples repositorios
        const [licitacionData, documentosData, resumenData] = await Promise.all([
          licitacionRepository.getById(id),
          documentoRepository.getByLicitacionId(id),
          documentoRepository.getResumenEstado(id)
        ]);

        setLicitacion(licitacionData);
        setDocumentos(documentosData);
        setResumenEstado(resumenData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12"><p>Cargando...</p></div>;
  }

  if (!licitacion || !resumenEstado) {
    return <div className="text-center py-12"><p>Licitación no encontrada</p></div>;
  }

  // Uso de los datos...
  const progress = Math.round((resumenEstado.aprobados / resumenEstado.total_documentos) * 100);

  return (
    <div>
      <h1>{licitacion.nombre}</h1>
      <p>Progreso: {progress}%</p>
      {/* Renderizar documentos */}
      {documentos.map(doc => (
        <div key={doc.id}>
          {doc.nombre} - {doc.estado}
        </div>
      ))}
    </div>
  );
}
```

## Flujo de Datos

### Lectura de Datos (Read Flow)
```
Component
  ↓ useEffect / Hook
  ↓ Repository.getById()
  ↓ mockData (en memoria)
  ↑ Promise.resolve(data)
  ↑ setState
  ↑ Re-render
```

### Actualización de Datos (Update Flow)
```
Component (user action)
  ↓ handleFileChange()
  ↓ Repository.updateEstado()
  ↓ Modifica mockData en memoria
  ↑ Promise.resolve(updatedData)
  ↑ setState (actualiza UI)
```

## Ventajas de este Patrón

1. **Separación de Responsabilidades**: Cada capa tiene una responsabilidad clara
2. **Testeable**: Los repositorios mock se pueden reemplazar fácilmente con repositorios HTTP
3. **Inversión de Dependencias**: Los componentes dependen de interfaces, no de implementaciones
4. **Reutilizable**: Los hooks y use cases son agnósticos de la fuente de datos
5. **Escalable**: Fácil migración de mock a API real sin cambiar componentes

## Migración a API Real

Para migrar a una API real, solo necesitas:

1. Crear `DocumentoRepositoryHttp.ts` que implemente `IDocumentoRepository`
2. Actualizar `src/infrastructure/repositories/index.ts`:
   ```typescript
   // Cambiar de:
   export const documentoRepository = new DocumentoRepositoryMock();

   // A:
   export const documentoRepository = new DocumentoRepositoryHttp();
   ```
3. Los componentes y hooks no necesitan cambios

## Ejemplo de Implementación HTTP

```typescript
// src/infrastructure/repositories/DocumentoRepositoryHttp.ts
import { IDocumentoRepository } from '@/domain/repositories/IDocumentoRepository';
import { Documento } from '@/domain/entities/Documento.entity';
import { ResumenEstado } from '@/domain/entities/ResumenEstado.entity';

export class DocumentoRepositoryHttp implements IDocumentoRepository {
  private baseUrl = process.env.REACT_APP_API_URL;

  async getAll(): Promise<Documento[]> {
    const response = await fetch(`${this.baseUrl}/documentos`);
    return response.json();
  }

  async getById(id: string): Promise<Documento | null> {
    const response = await fetch(`${this.baseUrl}/documentos/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async getByLicitacionId(licitacionId: string): Promise<Documento[]> {
    const response = await fetch(`${this.baseUrl}/licitaciones/${licitacionId}/documentos`);
    return response.json();
  }

  async getResumenEstado(licitacionId: string): Promise<ResumenEstado> {
    const response = await fetch(`${this.baseUrl}/licitaciones/${licitacionId}/resumen`);
    return response.json();
  }

  async updateEstado(id: string, estado: Documento['estado']): Promise<Documento> {
    const response = await fetch(`${this.baseUrl}/documentos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    return response.json();
  }
}
```

## Resumen de Ubicaciones Clave

- **Entidades**: `src/domain/entities/*.entity.ts`
- **Interfaces de Repositorio**: `src/domain/repositories/I*.ts`
- **Datos Mock**: `src/infrastructure/mock/*.data.ts`
- **Repositorios Mock**: `src/infrastructure/repositories/*RepositoryMock.ts`
- **Export centralizado**: `src/infrastructure/repositories/index.ts`
- **Hooks**: `src/hooks/use-*.ts`
- **Componentes**: `src/pages/*.tsx`, `src/components/**/*.tsx`

## Referencias en el Código

- **LicitacionDetail.tsx** (línea 21): Importa repositorios desde index
  ```typescript
  import { licitacionRepository, documentoRepository } from '@/infrastructure/repositories';
  ```

- **LicitacionDetail.tsx** (líneas 77-80): Llamada paralela a múltiples repositorios
  ```typescript
  const [licitacionData, documentosData, resumenData] = await Promise.all([
    licitacionRepository.getById(id),
    documentoRepository.getByLicitacionId(id),
    documentoRepository.getResumenEstado(id)
  ]);
  ```

- **Borradores.tsx** (línea 7): Uso de hook personalizado
  ```typescript
  const { data: rawLicitaciones = [], isLoading } = useLicitaciones();
  ```
