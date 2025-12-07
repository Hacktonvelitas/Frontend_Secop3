import { ICompanyRepository, CompanyProfileData } from '@/domain/repositories/ICompanyRepository';

export class UpdateCompanyUseCase {
    constructor(private readonly repository: ICompanyRepository) {}

    async execute(data: CompanyProfileData): Promise<void> {
        // Here we could add validation logic if needed
        return this.repository.updateCompany(data);
    }
}
