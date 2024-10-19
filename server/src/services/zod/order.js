import { z } from "zod";
export function validatePurchaseBody(value) {
  const buyNowBodySchema = z.object({
    product_id: z.number().min(0, "provide valid product id"),
    seller_id: z.number().min(0, "Provide valid seller id"),
    quantity: z.number().min(1, "Quantity should be greater than 0"),
    price: z.number().min(0, "provide valid price"),
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
