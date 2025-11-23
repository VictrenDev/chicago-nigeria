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

// export const createListingsSchema = z.object({
// 	title,
// });

export const createUserSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		DOB: z.string().refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date format",
		}),
		phone: z.string().min(1, "Phone number is required"),
		gender: z.enum(["male", "female"]),
		countryCode: z.string().optional(),
		currentCity: z.string().min(1, "Current city is required"),
		neighborhood: z.string().optional(),
		stateOfOrigin: z.string().min(1, "State of origin is required"),
		profession: z.string().min(1, "Profession is required"),
		business: z.string().optional(),
		brandName: z.string().optional(),
		company: z.string().min(1, "Company is required"),
		bio: z.string().optional(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
		isTermAndConditionAccepted: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
export type CreateUserSchema = z.infer<typeof createUserSchema>;
