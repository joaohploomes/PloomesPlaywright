import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplates/mockedDataDocumentTemplates";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IDocumentTemplates } from "@schemas";

test.describe("Get Document Templates", () => {
    test("Get Document Templates Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);
        expect(documentTemplate.Id).toBeDefined();

        const foundDocumentTemplate = await documentTemplatesController.findDocumentTemplatesById(documentTemplate.Id);
        expect(foundDocumentTemplate).toStrictEqual([documentTemplate]);
    });

    test("Get all Document Templates", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const documentTemplates = await generateMultipleItens<IDocumentTemplates>(
            documentTemplatesController.createDocumentTemplates.bind(documentTemplatesController), 
            () => generateMockedDocumentTemplates("Order"), 3);

        expect(documentTemplates).toBeDefined();

        const fetchedDocumentTemplates = await documentTemplatesController.findAllDocumentTemplates();
        expect(fetchedDocumentTemplates).toBeDefined();
        expect(fetchedDocumentTemplates).toMatchArrayId<IDocumentTemplates>(documentTemplates);

        await deleteMultipleItens<IDocumentTemplates>(
            documentTemplatesController.deleteDocumentTemplates.bind(documentTemplatesController),
            fetchedDocumentTemplates
        );
    });
});
