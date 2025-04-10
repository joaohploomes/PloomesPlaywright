import ContactService from "@services/Contact";

class ContactController {
	async findAllContacts() {
		const contactService = new ContactService();

		return contactService.findAllContacts();
	}
}

export default ContactController;
