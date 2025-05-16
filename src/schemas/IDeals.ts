import z from "zod";

const DealSchema = z.object({
    Id: z.number(), 
    Title: z.string(),
    Amount: z.number().optional(),
    CreatorId: z.number().optional(),
    OwnerId: z.number().optional(),
    PipelineId: z.number(),
    StageId: z.number(),
    ContactId: z.number(),
});

type IDeal = z.infer<typeof DealSchema>;

export {
    DealSchema
}; 

export type {
    IDeal
};
