import ContactService from "@services/Contacts";

class ContactController {
	async findAllContacts() {
		const contactService = new ContactService();
		await contactService.createRequest();
		const response = await contactService.findAllContacts();
		return response.json();
	}
}

export default ContactController;
