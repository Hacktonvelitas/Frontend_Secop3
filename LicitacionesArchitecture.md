# Arquitectura de Fetching de Licitaciones

Este documento describe cómo funciona la arquitectura de fetching de datos para el módulo de Licitaciones y cómo reemplazar el servicio mock con una API real.

## Diagrama de Flujo

```mermaid
graph TD
    UI[Dashboard / LicitacionDetail] --> Hook[useLicitaciones Hook]
    Hook --> UseCase[GetLicitacionesUseCase]
    UseCase --> Repo[LicitacionRepository]
    Repo --> Service[LicitacionService]
    Service --> API[API Externa / Mock]
```

## Componentes

1.  **LicitacionService (`src/infrastructure/services/LicitacionService.ts`)**:
    *   **Responsabilidad**: Realizar la petición HTTP (fetch) para obtener los datos crudos.
    *   **Actualidad**: Retorna un JSON mock con datos de prueba.
    *   **Futuro**: Deberá llamar a tu endpoint real.

2.  **LicitacionRepository (`src/infrastructure/repositories/LicitacionRepositoryMock.ts`)**:
    *   **Responsabilidad**: Adaptar (mapear) los datos que vienen del servicio (DTOs) al formato que usa la aplicación (Entidad `Licitacion`).
    *   Importante: **No necesitas cambiar esto** si tu API mantiene la misma estructura que el mock actual. Solo el servicio necesita cambios.

3.  **ILicitacionService (`src/domain/services/ILicitacionService.ts`)**:
    *   Contrato que debe cumplir el servicio. Define la estructura de los datos de respuesta esperados (`LicitacionResponseDTO`).

## Cómo cambiar a Datos Reales (API Real)

Para conectar con tu backend real, solo necesitas modificar el archivo `src/infrastructure/services/LicitacionService.ts`.

### Pasos:

1.  Abre `src/infrastructure/services/LicitacionService.ts`.
2.  Reemplaza el código del método `getLicitaciones` para usar `fetch`.

**Ejemplo de implementación real:**

```typescript
import { ILicitacionService, LicitacionResponseDTO } from '@/domain/services/ILicitacionService';

export class LicitacionService implements ILicitacionService {
  private readonly API_URL = 'https://api.tu-backend.com/v1/licitaciones'; // Tu URL real

  async getLicitaciones(): Promise<LicitacionResponseDTO> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TU_TOKEN_SI_ES_NECESARIO',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener licitaciones: ${response.statusText}`);
      }

      const data = await response.json();
      return data as LicitacionResponseDTO;
      
    } catch (error) {
      console.error('LicitacionService Error:', error);
      throw error;
    }
  }
}
```

### Notas Importantes

*   **Coincidencia de Campos**: Asegúrate de que tu API devuelva el JSON con la misma estructura definida en `LicitacionResponseDTO` (usuarioId, totalMatches, filtros, licitaciones...).
*   **Mapeo**: Si tu API devuelve nombres de campos diferentes (ej. `contract_id` en vez de `id`), puedes ajustar el **Mapper** en `LicitacionRepositoryMock.ts` o, idealmente, ajustar tu backend para que coincida con el contrato.

# Arquitectura de Registro de Usuarios

El registro utiliza el mismo patrón de Clean Architecture.

## Flujo de Datos

```mermaid
graph TD
    UI[Register Page] --> Hook[useRegister Hook]
    Hook --> UseCase[RegisterUseCase]
    UseCase --> Repo[AuthRepository]
    Repo --> Service[AuthService]
    Service --> API[API Externa / Mock]
```

## Estructura del Payload

El servicio `AuthService` envía los datos en el siguiente formato específico requerido:

```json
{
  "email": "correo@ejemplo.com",
  "nombre_completo": "Juan Perez",
  "empresa_nit": "123456789", // Valor por defecto si no se provee
  "is_active": true,
  "password": "..."
}
```

## Archivos Clave

*   **`src/infrastructure/services/AuthService.ts`**: Contiene la lógica del fetch simulado. Aquí es donde debes reemplazar el código para conectar con tu API real de autenticación.
*   **`src/infrastructure/repositories/AuthRepository.ts`**: Realiza el mapeo de los datos del formulario (`RegisterData`) al formato JSON final (`RegisterPayload`).
*   **`src/pages/Register.tsx`**: UI que consume el hook `useRegister`.

