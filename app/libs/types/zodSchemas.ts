import { z } from "zod";
export const subscriptionSchema = z.object({
	// business information
	businessName: z
		.string()
		.min(4, "Business name can not be less than 4 characters"),
	businessCategory: z
		.string()
		.min(4, "Business name can not be less than 4 characters"),
	// contact information
	businessEmail: z.string().email("Invalid email address"),
	businessPhone: z
		.number("Must be a number")
		.min(7, "Phone number cannot be less than 7 digits")
		.max(11, "Phone number cannot be more than 11 digits"),
	businessBio: z
		.string()
		.min(10, "Description can not be less than 10 characters"),
});
export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
