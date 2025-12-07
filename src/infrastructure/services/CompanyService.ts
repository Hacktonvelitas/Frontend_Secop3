export interface UpdateCompanyPayload {
    razon_social: string;
    ciiu1: string;
    pais: string;
    nit: string;
}

export class CompanyService {
    async updateCompany(payload: UpdateCompanyPayload): Promise<void> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        console.log('Company Update Payload:', payload);
        
        // Simulate success
        return Promise.resolve();
    }
}
