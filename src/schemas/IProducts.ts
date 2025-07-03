import z from "zod"

const ProductsSchema = z.object({
    Id: z.number(),
    GroupId: z.number(),
    MeasurementUnit: z.string(),
    Name: z.string(),
    UnitPrice: z.number(),
});

type IProducts = z.infer<typeof ProductsSchema>;

export {
    ProductsSchema
};

export type {
    IProducts
};
