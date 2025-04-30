import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";

test.describe("Contact tests", () => {
	test("Create a Contact", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact();
		const contact = await contactController.createContact(data);
		expect(contact).toBeDefined();

		await contactController.deleteContact(contact.id);
	});

	test("Find all Contacts", async () => {
		const contactController = new ContactController();

		const data1 = generateMockedContact();
		const contact1 = await contactController.createContact(data1);

		const data2 = generateMockedContact();
		const contact2 = await contactController.createContact(data2);

		const contacts = await contactController.findAllContacts();
		expect(contacts).toBeDefined();
		expect(contacts).toContainEqual(contact1);
		expect(contacts).toContainEqual(contact2);

		await contactController.deleteContact(contact1.id);
		await contactController.deleteContact(contact2.id);
	});

});
