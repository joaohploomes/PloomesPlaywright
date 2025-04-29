import ContactController from "@controllers/Contacts";
import { expect, test } from "@playwright/test";

test.describe("Contact tests", () => {
	test("Banco contem o cliente depois de ser criado", async () => {
		const contactController = new ContactController();
		const allContacts = await contactController.findAllContacts();

		expect(allContacts).not.toEqual([]);
	});
});
