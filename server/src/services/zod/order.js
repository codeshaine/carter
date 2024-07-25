import { z } from "zod";
export function validateBuyNowBody(value) {
  const buyNowBodySchema = z.object({
    slug: z.string().min(1, "Please provide the valid slug"),
    quantity: z.number().min(1, "Quantity should be greater than 0"),
    userAddress: z.number().min(1, "userAdress should be greater than 0"),
  });
  return buyNowBodySchema.safeParse(value);
}
export function validateAddToCart(value) {
  const buyNowBodySchema = z.object({
    slug: z.string().min(1, "Please provide the valid slug"),
    quantity: z.number().min(1, "Quantity should be greater than 0"),
  });
  return buyNowBodySchema.safeParse(value);
}
