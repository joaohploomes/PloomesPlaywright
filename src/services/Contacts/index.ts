import type { APIRequestContext } from "@playwright/test";
import type { IContact } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class ContactService {
	endpoint = "Contacts";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser){
		if(user){
			this.auth.updateUser(user);
		}
	}

	async findAllContacts(): Promise<IContact[]> {
		const context = await this.auth.createContext();
		const odata = new QueryOdata();
		const response = await context.get(`${this.endpoint}${odata.orderBy(["Id desc"])}`);
		const json = await response.json();
		return json.value;
	};

	async createContact(Contact: IContact): Promise<IContact> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, {data: Contact});
		const json = await response.json();
		return json.value[0];
	};

	async updateContact(Contact: IContact, data: Partial<IContact>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${Contact.Id})`, {data: data});
		const json = await response.json();
		return json.value[0];
	};

	async deleteContact(Contact: IContact) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${Contact.Id})`);
		return response;
	};

	async findContactById(Id: number): Promise<IContact[]> {
		const context = await this.auth.createContext();
		const odata = new QueryOdata();
		const response = await context.get(`${this.endpoint}${odata.filter(`Id eq ${Id}`)}`);
		const json = await response.json();
		return json.value;
	};

};

export default ContactService;
