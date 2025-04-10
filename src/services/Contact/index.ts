import { authenticatedRequest } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type IContact from "@schemas/IContact";

class ContactService {
	endpoint: "Contact";
	request: APIRequestContext;

	constructor() {
		authenticatedRequest().then((req) => {
			this.request = req;
		});
	}

	async findAllContacts() {
		if (this.request) return await this.request.get(this.endpoint);
	}

	findContactByEmail(email: string) {}

	createContact(Contact: IContact) {}
}

export default ContactService;
