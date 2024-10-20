import { z } from "zod";

// Base schema for shared seller fields
const baseSellerSchema = z.object({
  seller_name: z.string("must be a string").min(1, "Seller name is required"),
  seller_address: z.string().min(1, "Seller address is required"),
  seller_contact_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  seller_url: z.string().url("Invalid seller URL").optional(),
  seller_email: z.string().email("Invalid email").optional(),
  seller_bio: z
    .string()
    .max(500, "Bio must be 500 characters or less")
    .optional(),
  seller_description: z
    .string()
    .max(1000, "Description must be 1000 characters or less")
    .optional(),
});

export function validateSellerBody(value) {
  return baseSellerSchema.safeParse(value);
}

export function validateUpdateSellerBody(value) {
  const updateSellerBodySchema = baseSellerSchema.partial();
  return updateSellerBodySchema.safeParse(value);
}
