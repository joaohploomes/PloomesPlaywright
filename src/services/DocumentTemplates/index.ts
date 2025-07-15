import { QueryOdata } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type { IDocumentTemplates } from "@schemas";
import type { IUser } from "@types";
import Authentication from "../../auth/authentication";

class DocumentTemplatesService {
	endpoint = "DocumentTemplates";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser) {
		if (user) {
			this.auth.updateUser(user);
		}
	}

	async findAllDocumentTemplates(top: number): Promise<IDocumentTemplates[]> {
		const context = await this.auth.createContext();
		const odata = new QueryOdata({
			orderBy: { Id: "desc" },
			top: top,
		});
		const query = odata.toString();
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}

	async createDocumentTemplate(documentTemplate: IDocumentTemplates): Promise<IDocumentTemplates> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, { data: documentTemplate });
		const json = await response.json();
		return json.value[0];
	}

	async updateDocumentTemplate(documentTemplate: IDocumentTemplates, data: Partial<IDocumentTemplates>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${documentTemplate.Id})`, { data });
		const json = await response.json();
		return json.value[0];
	}

	async deleteDocumentTemplate(documentTemplate: IDocumentTemplates) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${documentTemplate.Id})`);
		return response;
	}

	async findDocumentTemplateById(Id: number): Promise<IDocumentTemplates[]> {
		const context = await this.auth.createContext();
		const query = `$filter=Id eq ${Id}`;
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}
}

export default DocumentTemplatesService;
