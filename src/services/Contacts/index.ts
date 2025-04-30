import type { APIRequestContext } from "@playwright/test";
import type { IContact } from "@schemas";
import Authentication from "../../auth/authentication";

class ContactService {
	endpoint = "Contacts";
	request: APIRequestContext;
	auth = new Authentication();

	async findAllContacts() {
		const context = await this.auth.createContext();
		const response = await context.get(this.endpoint);
		const json = await response.json();
		return json.value;
	};

	async createContact(Contact: IContact) {
		const context = await this.auth.createContext();
		const response = await context.post(this.endpoint, {data: Contact});
		const json = await response.json();
		return json.value;
	};

	async updateContact(Contact: IContact, data: Partial<IContact>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${Contact.id})`, {data: data});
		const json = await response.json();
		return json.value;
	};

	async deleteContact(Contact: IContact) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${Contact.id})`);
		const json = await response.json();
		return json.value;
	};

	async findContactById(id: number) {
		const context = await this.auth.createContext();
		const response = await context.get(`${this.endpoint}(${id})`);
		const json = await response.json();
		return json.value;
	};

};

export default ContactService;
