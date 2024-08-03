import { z } from "zod";

export function validateSellerBody(value) {
  const sellerSchema = z.object({
    seller_name: z.string("must be a string").min(1, "Seller name is required"),
    // logoUrl: z.string().url("Invalid logo URL").optional(),
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

  return sellerSchema.safeParse(value);
}

//TODO havent wrote the unit test
export function validateUpdateSellerBody(value) {
  const updateSellerBodySchema = z.object({
    name: z
      .string("must be a string")
      .min(1, "Seller name is required")
      .optional(),
    logoUrl: z.string().url("Invalid logo URL").optional(),
    sellerAddress: z.string().min(1, "Seller address is required").optional(),
    contactNumber: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .optional(),
    sellerUrl: z.string().url("Invalid seller URL").optional(),
    sellerEmail: z.string().email("Invalid email").optional(),
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    description: z
      .string()
      .max(1000, "Description must be 1000 characters or less")
      .optional(),
  });
  return updateSellerBodySchema.safeParse(value);
}
