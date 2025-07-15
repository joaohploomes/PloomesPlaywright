import z from "zod";

const ProductsGroupsSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	FamilyId: z.number().nullable().optional(),
});

type IProductsGroups = z.infer<typeof ProductsGroupsSchema>;

export { ProductsGroupsSchema };

export type { IProductsGroups };
