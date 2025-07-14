import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import generateMockedContact from "../mockedDataContact/mockedDataContact";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IContact } from "@schemas";

test.describe("Get Contact", () => {
    test("Get a Contact Correctly", async () => {
        const contactController = new ContactController();
        const data = generateMockedContact("person");
        const contact = await contactController.createContact(data);
        expect(contact.Id).toBeDefined();

        const [fetchedContact] = await contactController.findContactById(contact.Id);
        expect(fetchedContact).toBeDefined();
        expect(fetchedContact).toEqual(contact);

        await contactController.deleteContact(fetchedContact);
    });

    test("Get All Contacts", async () => {
        const contactController = new ContactController();
        const contacts = await generateMultipleItens<IContact>(contactController.createContact.bind(contactController), ()=> generateMockedContact("person"), 3);
        expect(contacts).toBeDefined();
        
        const fetchedContacts = await contactController.findAllContacts();
        expect(fetchedContacts).toBeDefined();
        expect(fetchedContacts).toMatchArrayId<IContact>(contacts);
        
        await deleteMultipleItens<IContact>(contactController.deleteContact.bind(contactController), contacts);
    });
});
