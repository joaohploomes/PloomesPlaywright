import z from "zod";

const ContactSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	Email: z.string().email().optional(),
});

type IContact = z.infer<typeof ContactSchema>;

export {
	ContactSchema
};

export type {
	IContact
};
