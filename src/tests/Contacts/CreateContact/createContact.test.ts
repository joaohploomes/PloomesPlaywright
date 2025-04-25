import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";
import createMock from "../lib/createContactMock";

test.describe("Contact tests", () => {
	test("Banco contem o cliente depois de ser criado", async () => {
		const contact = createMock();
		const contactController = new ContactController();
		const allContacts = await contactController.findAllContacts();

		expect(allContacts).not.toEqual([]);
	});
});
