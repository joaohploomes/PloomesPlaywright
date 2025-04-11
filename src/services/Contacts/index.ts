import { authenticatedRequest } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type IContact from "@schemas/IContact";

class ContactService {
	endpoint = "Contacts";
	request: APIRequestContext;

	async createRequest(){
		this.request = await authenticatedRequest();
	}

	async findAllContacts() {
		if(this.request) return await this.request.get(this.endpoint);
	}

	findContactByEmail(email: string) {}

	createContact(Contact: IContact) {}
}

export default ContactService;
