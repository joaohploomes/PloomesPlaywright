import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";

test.describe("Update Contact", () => {
    test("Update a Contact Correctly", async () => {
        const contactController = new ContactController();
        const data = generateMockedContact("person");
        const contact = await contactController.createContact(data);
        expect(contact.Id).toBeDefined();

        const updateData = generateMockedContact("person");
        const updatedContact = await contactController.updateContact(contact, updateData);
        expect(updatedContact.Name).toBe(updateData.Name);

        await contactController.deleteContact(updatedContact);
    });
});
