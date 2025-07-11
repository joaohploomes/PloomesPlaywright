import type { IDocumentTemplate } from "@schemas";
import DocumentTemplatesService from "@services/DocumentTemplates";
import type { IUser } from "@types";

class DocumentTemplatesController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllDocumentTemplates() {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.findAllDocumentTemplates();
        return response;
    };

    async findDocumentTemplatesById(Id: number) {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.findDocumentTemplatesById(Id);
        return response;
    };

    async createDocumentTemplates(data: IDocumentTemplate) {
        const user = this?.user || undefined;
        const documentTemplatesService = new DocumentTemplatesService(user);
        const response = await documentTemplatesService.createDocumentTemplates(data);
        return response;
    };

    async updateDocumentTemplates(documentTemplate: IDocumentTemplate, data: Partial<IDocumentTemplate>) {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.updateDocumentTemplates(documentTemplate, data);
        return response;
    };

    async deleteDocumentTemplates(documentTemplate: IDocumentTemplate) {
        const documentTemplatesService = new DocumentTemplatesService();
        const response = await documentTemplatesService.deleteDocumentTemplates(documentTemplate);
        return response;
    };
};

export default DocumentTemplatesController;
