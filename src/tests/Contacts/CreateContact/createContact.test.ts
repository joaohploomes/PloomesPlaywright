import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";
import type { IContact } from "@schemas";
import { generateMultipleItens, deleteMultipleItens } from "@lib";

test.describe("Contact tests", () => {
	test("Create a Contact", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact();
		const contact = await contactController.createContact(data);
	
		expect(contact).toBeDefined();

		await contactController.deleteContact(contact);
	});

	test("Find all Contacts", async () => {
		const contactController = new ContactController();
	
		await generateMultipleItens<IContact>(contactController.createContact.bind(ContactController), generateMockedContact, 10);

		const contacts = await contactController.findAllContacts();
		expect(contacts).toBeDefined();

		await deleteMultipleItens<IContact>(contactController.deleteContact, [contacts]);
	});
});
