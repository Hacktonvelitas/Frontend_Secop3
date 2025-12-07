import { ICompanyRepository, CreateCompanyData } from '@/domain/repositories/ICompanyRepository';

export class CreateCompanyUseCase {
    constructor(private readonly companyRepository: ICompanyRepository) {}

    async execute(data: CreateCompanyData): Promise<{ id: string; nit: string }> {
        this.validateData(data);
        return await this.companyRepository.createCompany(data);
    }

    private validateData(data: CreateCompanyData): void {
        if (!data.razon_social || data.razon_social.trim() === '') {
            throw new Error('La razón social es requerida');
        }

        if (!data.nit || data.nit.trim() === '') {
            throw new Error('El NIT es requerido');
        }

        if (!data.correo_contacto || data.correo_contacto.trim() === '') {
            throw new Error('El correo de contacto es requerido');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.correo_contacto)) {
            throw new Error('El formato del correo es inválido');
        }

        if (!data.pais || data.pais.trim() === '') {
            throw new Error('El país es requerido');
        }
    }
}
