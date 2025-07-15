import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { IDocumentTemplates } from "@schemas";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplate/mockedDataDocumentTemplate";

test.describe("Get Document Templates", () => {
	test("Get Document Templates Correctly", async () => {
		const documentTemplatesController = new DocumentTemplatesController();
		const data = generateMockedDocumentTemplates("Quote");
		const documentTemplate = await documentTemplatesController.createDocumentTemplate(data);
		expect(documentTemplate.Id).toBeDefined();

		const fetchedDocumentTemplate = await documentTemplatesController.findDocumentTemplateById(documentTemplate.Id);
		expect(fetchedDocumentTemplate).toStrictEqual([documentTemplate]);

		await documentTemplatesController.deleteDocumentTemplate(documentTemplate);
	});

	test("Get all Document Templates", async () => {
		const documentTemplatesController = new DocumentTemplatesController();
		const documentTemplates = await generateMultipleItens<IDocumentTemplates>(
			documentTemplatesController.createDocumentTemplate.bind(documentTemplatesController),
			() => generateMockedDocumentTemplates("Order"),
			3,
		);

		expect(documentTemplates).toBeDefined();

		const fetchedDocumentTemplates = await documentTemplatesController.findAllDocumentTemplates();
		expect(fetchedDocumentTemplates).toBeDefined();
		expect(fetchedDocumentTemplates).toMatchArrayId<IDocumentTemplates>(documentTemplates);

		await deleteMultipleItens<IDocumentTemplates>(
			documentTemplatesController.deleteDocumentTemplate.bind(documentTemplatesController),
			documentTemplates,
		);
	});
});
