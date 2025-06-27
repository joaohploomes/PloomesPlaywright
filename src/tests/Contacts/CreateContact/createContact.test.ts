import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";

test.describe("Create Contact", () => {
	test("Create a Company Correctly", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact("company");
		const contact = await contactController.createContact(data);
		expect(contact.Id).toBeDefined();

		await contactController.deleteContact(contact);
	});

	test("Create a Person Correctly", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact("person");
		const contact = await contactController.createContact(data);
		expect(contact.Id).toBeDefined();

		await contactController.deleteContact(contact);
	});

});
