export interface CreateCompanyPayload {
    razon_social: string;
    ciiu1: string;
    ciiu2: string;
    ciiu3: string;
    ciiu4: string;
    pais: string;
    departamento: string;
    municipio: string;
    direccion_legal: string;
    correo_contacto: string;
    fecha_constitucion: string;
    anios_existencia: number;
    tamano_empresarial: string;
    nit: string;
}

export interface UpdateCompanyPayload {
    razon_social: string;
    ciiu1: string;
    pais: string;
    nit: string;
}

export class CompanyService {
    async createCompany(payload: CreateCompanyPayload): Promise<any> {
        try {
            console.log('Enviando al backend - Crear Empresa:', payload);

            const response = await fetch('http://98.81.137.170:8000/api/v1/empresas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Respuesta del backend Empresa - Status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.log('Error del backend Empresa:', errorData);
                const errorMessage = errorData.detail || errorData.message || 'Error al crear empresa';
                throw new Error(errorMessage);
            }

            const data = await response.json().catch(() => null);
            console.log('Respuesta exitosa del backend Empresa:', data);

            if (!data) {
                throw new Error('El servidor no devolvió datos válidos de la empresa');
            }

            return data;
        } catch (error) {
            console.error('Create company error:', error);
            throw error;
        }
    }

    async updateCompany(payload: UpdateCompanyPayload): Promise<void> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        console.log('Company Update Payload:', payload);

        // Simulate success
        return Promise.resolve();
    }
}
