import { useMutation } from '@tanstack/react-query';
import { UpdateCompanyUseCase } from '@/application/use-cases/company/UpdateCompanyUseCase';
import { CompanyRepository } from '@/infrastructure/repositories/CompanyRepository';
import { CompanyService } from '@/infrastructure/services/CompanyService';
import { CompanyProfileData } from '@/domain/repositories/ICompanyRepository';

// Dependency Injection
const companyService = new CompanyService();
const companyRepository = new CompanyRepository(companyService);
const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository);

export function useUpdateCompany() {
    return useMutation({
        mutationFn: (data: CompanyProfileData) => updateCompanyUseCase.execute(data)
    });
}
