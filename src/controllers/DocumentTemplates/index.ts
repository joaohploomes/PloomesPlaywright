import type { IDocumentTemplates } from "@schemas";
import DocumentTemplatesService from "@services/DocumentTemplates";
import type { IUser } from "@types";

class DocumentTemplatesController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllDocumentTemplates(top = 15) {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.findAllDocumentTemplates(top);
        return response;
    };

    async findDocumentTemplateById(Id: number) {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.findDocumentTemplateById(Id);
        return response;
    };

    async createDocumentTemplate(data: IDocumentTemplates) {
        const user = this?.user || undefined;
        const documentTemplatesService = new DocumentTemplatesService(user);
        const response = await documentTemplatesService.createDocumentTemplate(data);
        return response;
    };

    async updateDocumentTemplate(documentTemplate: IDocumentTemplates, data: Partial<IDocumentTemplates>) {
        const documentTemplatesService = new DocumentTemplatesService(this.user);
        const response = await documentTemplatesService.updateDocumentTemplate(documentTemplate, data);
        return response;
    };

    async deleteDocumentTemplate(documentTemplate: IDocumentTemplates) {
        const documentTemplatesService = new DocumentTemplatesService();
        const response = await documentTemplatesService.deleteDocumentTemplate(documentTemplate);
        return response;
    };
};

export default DocumentTemplatesController;
