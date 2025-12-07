import { ICompanyRepository, CompanyProfileData, CreateCompanyData } from '@/domain/repositories/ICompanyRepository';
import { CompanyService } from '@/infrastructure/services/CompanyService';

export class CompanyRepository implements ICompanyRepository {
    constructor(private readonly companyService: CompanyService) {}

    async createCompany(data: CreateCompanyData): Promise<{ id: string; nit: string }> {
        try {
            const response = await this.companyService.createCompany(data);

            if (!response) {
                throw new Error('No se recibió respuesta del servidor al crear la empresa');
            }

            return {
                id: response.id || response._id || data.nit,
                nit: response.nit || data.nit
            };
        } catch (error) {
            console.error('Error en CompanyRepository.createCompany:', error);
            throw error;
        }
    }

    async updateCompany(data: CompanyProfileData): Promise<void> {
        const payload = {
            razon_social: data.nombreLegal,
            ciiu1: data.ciudad,
            pais: "Colombia",
            nit: data.nit
        };

        await this.companyService.updateCompany(payload);
    }
}
