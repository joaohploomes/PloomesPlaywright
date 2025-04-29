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
	}

	findContactByEmail(email: string) {}

	createContact(Contact: IContact) {}
}

export default ContactService;
