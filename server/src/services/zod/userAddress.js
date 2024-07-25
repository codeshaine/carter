import { z } from "zod";

export function validateUserAddress(value) {
  const userAddressSchema = z.object({
    street: z.string().min(1, "Street must consist of at least one word."),
    village: z.string().min(1, "Village must consist of at least one word."),
    taluk: z.string().min(1, "Taluk must consist of at least one word."),
    district: z.string().min(1, "District must consist of at least one word."),
    state: z.string().min(1, "State must consist of at least one word."),
    contactNumber: z
      .string()
      .length(10, "Contact number must be exactly 10 digits."),
    pinCode: z.string().length(6, "Pin code must be exactly 6 digits."),
  });

  return userAddressSchema.safeParse(value);
}
