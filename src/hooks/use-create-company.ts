import { useMutation } from '@tanstack/react-query';
import { CreateCompanyUseCase } from '@/application/use-cases/company/CreateCompanyUseCase';
import { CompanyRepository } from '@/infrastructure/repositories/CompanyRepository';
import { CompanyService } from '@/infrastructure/services/CompanyService';
import { CreateCompanyData } from '@/domain/repositories/ICompanyRepository';

const companyService = new CompanyService();
const companyRepository = new CompanyRepository(companyService);
const createCompanyUseCase = new CreateCompanyUseCase(companyRepository);

export function useCreateCompany() {
    return useMutation({
        mutationFn: (data: CreateCompanyData) => createCompanyUseCase.execute(data),
    });
}
