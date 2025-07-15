import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplate/mockedDataDocumentTemplate";

test.describe("Update Document Templates", () => {
    test("Update a Document Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplate(data);

        expect(documentTemplate.Id).toBeDefined();

        const updatedData = generateMockedDocumentTemplates("Quote");
        const updatedDocumentTemplate = await documentTemplatesController.updateDocumentTemplate(documentTemplate, updatedData);

        expect(updatedDocumentTemplate.Name).toBe(updatedData.Name);

        await documentTemplatesController.deleteDocumentTemplate(updatedDocumentTemplate);
    });
});
