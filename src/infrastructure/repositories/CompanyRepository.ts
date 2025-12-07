import { ICompanyRepository, CompanyProfileData } from '@/domain/repositories/ICompanyRepository';
import { CompanyService } from '@/infrastructure/services/CompanyService';

export class CompanyRepository implements ICompanyRepository {
    constructor(private readonly companyService: CompanyService) {}

    async updateCompany(data: CompanyProfileData): Promise<void> {
        const payload = {
            razon_social: data.nombreLegal,
            ciiu1: data.ciudad, // Mapped as requested
            pais: "Colombia",
            nit: data.nit
        };

        await this.companyService.updateCompany(payload);
    }
}
