export interface CompanyProfileData {
    nombreLegal: string;
    nit: string;
    sector: string;
    tamano: string;
    ciudad: string;
}

export interface CreateCompanyData {
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

export interface ICompanyRepository {
    createCompany(data: CreateCompanyData): Promise<{ id: string; nit: string }>;
    updateCompany(data: CompanyProfileData): Promise<void>;
}
