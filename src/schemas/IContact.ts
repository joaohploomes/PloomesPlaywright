import z from "zod";

const ContactSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	Email: z.string().email().optional(),
	TypeId: z.number().int().min(1).max(2).optional(),
});

type IContact = z.infer<typeof ContactSchema>;

export {
	ContactSchema
};

export type {
	IContact
};
