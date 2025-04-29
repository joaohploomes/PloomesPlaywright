import ContactService from "@services/Contacts";

class ContactController {
	async findAllContacts() {
		const contactService = new ContactService();
		const response = await contactService.findAllContacts();
		return response;
	}
}

export default ContactController;
