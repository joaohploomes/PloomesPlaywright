import type { APIRequestContext } from "@playwright/test";
import type { IDocumentTemplate } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class DocumentTemplatesService {
    endpoint = "DocumentTemplates";
    request: APIRequestContext;
    auth = new Authentication();

    constructor(user?: IUser) {
        if (user) {
            this.auth.updateUser(user);
        }
    }

    async findAllDocumentTemplates(): Promise<IDocumentTemplate[]> {
        const context = await this.auth.createContext();
        const odata = new QueryOdata({
            orderBy: { Id: "desc" },
        });
        const query = odata.toString();
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    }

    async createDocumentTemplates(documentTemplate: IDocumentTemplate): Promise<IDocumentTemplate> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, { data: documentTemplate });
        const json = await response.json();
        return json.value[0];
    }

    async updateDocumentTemplates(documentTemplate: IDocumentTemplate, data: Partial<IDocumentTemplate>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${documentTemplate.Id})`, { data });
        const json = await response.json();
        return json.value[0];
    }

    async deleteDocumentTemplates(documentTemplate: IDocumentTemplate) {
        const context = await this.auth.createContext();
        const response = await context.delete(`${this.endpoint}(${documentTemplate.Id})`);
        return response;
    }

    async findDocumentTemplatesById(Id: number): Promise<IDocumentTemplate[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    }
};

export default DocumentTemplatesService;
