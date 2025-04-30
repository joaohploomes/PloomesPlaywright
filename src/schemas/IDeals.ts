import z from "zod";

const DealSchema = z.object({
    id: z.string(), 
    title: z.string(),
    amount: z.number().optional(),
    creatorId: z.number(),
    ownerId: z.number(),
    pipelineId: z.number(),
    stageId: z.number(),
    contactId: z.number(),
});

type IDeal = z.infer<typeof DealSchema>;

export {
    DealSchema
}; 

export type {
    IDeal
};
