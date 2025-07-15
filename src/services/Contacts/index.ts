import { QueryOdata } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type { IContact } from "@schemas";
import type { IUser } from "@types";
import Authentication from "../../auth/authentication";

class ContactService {
	endpoint = "Contacts";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser) {
		if (user) {
			this.auth.updateUser(user);
		}
	}

	async findAllContacts(top: number): Promise<IContact[]> {
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

	async createContact(Contact: IContact): Promise<IContact> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, { data: Contact });
		const json = await response.json();
		return json.value[0];
	}

	async updateContact(Contact: IContact, data: Partial<IContact>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${Contact.Id})`, { data: data });
		const json = await response.json();
		return json.value[0];
	}

	async deleteContact(Contact: IContact) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${Contact.Id})`);
		return response;
	}

	async findContactById(Id: number): Promise<IContact[]> {
		const context = await this.auth.createContext();
		const query = `$filter=Id eq ${Id}`;
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}
}

export default ContactService;
