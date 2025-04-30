import { IContact } from "@schemas";
import ContactService from "@services/Contacts";

class ContactController {
	async findAllContacts() {
		const contactService = new ContactService();
		const response = await contactService.findAllContacts();
		return response;
	};

	async findContactById(id: number) {
		const contactService = new ContactService();
		const response = await contactService.findContactById(id);
		return response;
	};

	async createContact(data: IContact) {
		const contactService = new ContactService();
		const response = await contactService.createContact(data);
		return response;
	};

	async updateContact(contact: IContact, data: Partial<IContact>) {
		const contactService = new ContactService();
		const response = await contactService.updateContact(contact, data);
		return response;
	};

	async deleteContact(contact: IContact) {
		const contactService = new ContactService();
		const response = await contactService.deleteContact(contact);
		return response;
	};
	
};

export default ContactController;
