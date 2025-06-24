import z from "zod";

const ProductsFamiliesSchema = z.object({
    Id: z.number(),
    Name: z.string(),
});

type IProductsFamilies = z.infer<typeof ProductsFamiliesSchema>;

export {
    ProductsFamiliesSchema
};

export type {
    IProductsFamilies
};
