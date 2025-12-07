export interface CompanyProfileData {
    nombreLegal: string;
    nit: string;
    sector: string;
    tamano: string;
    ciudad: string;
}

export interface ICompanyRepository {
    updateCompany(data: CompanyProfileData): Promise<void>;
}
