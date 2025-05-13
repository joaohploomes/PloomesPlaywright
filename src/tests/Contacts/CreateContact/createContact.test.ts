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
	
		const [
			contact1,
			contact2,
			contact3
		] = await generateMultipleItens<IContact>(contactController.createContact, generateMockedContact, 3);

		const contacts = await contactController.findAllContacts();
		expect(contacts).toBeDefined();
		expect(contacts).toContainEqual(contact1);
		expect(contacts).toContainEqual(contact2);
		expect(contacts).toContainEqual(contact3);

		await deleteMultipleItens<IContact>(contactController.deleteContact, [contact1, contact2, contact3]);
	});

});
