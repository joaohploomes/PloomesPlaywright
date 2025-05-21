import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";

test.describe("Delete Contact", () => {
	test.skip("Delete a Contact Correctly", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact();
		const contact = await contactController.createContact(data);
		expect(contact).toBeDefined();

        await contactController.deleteContact(contact);
        const deletedContact = await contactController.findContactById(contact.id);
        expect(deletedContact).toBeUndefined();
	});
});