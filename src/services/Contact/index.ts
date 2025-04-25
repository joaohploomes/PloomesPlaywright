import type { APIRequestContext } from "@playwright/test";
import type IContact from "@schemas/IContact";
import Authentication from "../../auth/authentication";
import users from "../../constants/users";

class ContactService {
	endpoint = "Contacts";
	request: APIRequestContext;
	auth = new Authentication(users.usuario1.email, users.usuario1.password);

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
