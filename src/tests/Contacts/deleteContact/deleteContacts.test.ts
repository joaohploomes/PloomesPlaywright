import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";

test.describe("Delete Contact", () => {
	test("Delete a Contact Correctly", async () => {
		const contactController = new ContactController();
		const data = generateMockedContact("company");
		const contact = await contactController.createContact(data);
		expect(contact.Id).toBeDefined();

        await contactController.deleteContact(contact);
        const deletedContact = await contactController.findContactById(contact.Id);
        expect(deletedContact).toStrictEqual([]);
	});
});
