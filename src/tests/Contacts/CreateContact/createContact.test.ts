import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";
import type { IContact } from "@schemas";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
<<<<<<< HEAD

=======
>>>>>>> db8e2aba6008b19c1a8ed44f8e088c8d0cf5614f

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
	
<<<<<<< HEAD
		const [
			contact1,
			contact2,
			contact3
		] = await generateMultipleItens<IContact>(contactController.createContact, generateMockedContact, 3);
=======
		await generateMultipleItens<IContact>(contactController.createContact.bind(ContactController), generateMockedContact, 10);
>>>>>>> db8e2aba6008b19c1a8ed44f8e088c8d0cf5614f

		const contacts = await contactController.findAllContacts();
		expect(contacts).toBeDefined();

<<<<<<< HEAD
		await deleteMultipleItens<IContact>(contactController.deleteContact, [contact1, contact2, contact3]);
=======
		await deleteMultipleItens<IContact>(contactController.deleteContact, [contacts]);
>>>>>>> db8e2aba6008b19c1a8ed44f8e088c8d0cf5614f
	});
});
