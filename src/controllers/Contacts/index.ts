import type { IContact } from "@schemas";
import ContactService from "@services/Contacts";
import type { IUser } from "@types";

class ContactController {

	private user?: IUser;

	constructor(user?: IUser){
		this.user = user;
	}

	async findAllContacts() {
		const contactService = new ContactService(this.user);
		const response = await contactService.findAllContacts();
		return response;
	};

	async findContactById(id: number) {
		const contactService = new ContactService(this.user);
		const response = await contactService.findContactById(id);
		return response;
	};

	async createContact(data: IContact) {
		const user = this?.user || undefined; 
		const contactService = new ContactService(user);
		const response = await contactService.createContact(data);
		return response;
	};

	async updateContact(contact: IContact, data: Partial<IContact>) {
		const contactService = new ContactService(this.user);
		const response = await contactService.updateContact(contact, data);
		return response;
	};

	async deleteContact(contact: IContact) {
		const contactService = new ContactService();
		const response = await contactService.deleteContact(contact);
		const text = await response.text();		
	};
	
};

export default ContactController;
