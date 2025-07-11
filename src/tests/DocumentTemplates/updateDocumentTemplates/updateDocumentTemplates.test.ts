import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplates/mockedDataDocumentTemplates";

test.describe("Update Document Templates", () => {
    test("Update a Document Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);

        expect(documentTemplate.Id).toBeDefined();

        const updatedData = generateMockedDocumentTemplates("Quote");
        const updatedDocumentTemplate = await documentTemplatesController.updateDocumentTemplates(documentTemplate, updatedData);

        expect(updatedDocumentTemplate.Name).toBe(updatedData.Name);

        await documentTemplatesController.deleteDocumentTemplates(updatedDocumentTemplate);
    });
});
