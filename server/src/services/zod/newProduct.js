import { z } from "zod";

export function validateProductBody(value) {
  const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    subName: z.string().optional(),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    category: z.enum([
      "Electronics",
      "Clothes",
      "Books",
      "Furniture",
      "Toys",
      "Accessories",
    ]),
    stock: z.number().min(0, "Invalid stock number"),
    tags: z.array(z.string()).optional(), //TODO may remove this depending on the need
  });
  return productSchema.safeParse(value);
}

//TODO havent wrote the unit test
export function validateUpdateProductBody(value) {
  const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required").optional(),
    subName: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    description: z.string().min(1, "Description is required").optional(),
    imageUrl: z
      .string()
      .url("Invalid image URL")
      .optional()
      .nullable()
      .optional(),
    videoUrl: z
      .string()
      .url("Invalid video URL")
      .optional()
      .nullable()
      .optional(),
    category: z.enum([
      "Electronics",
      "Clothes",
      "Books",
      "Furniture",
      "Toys",
      "Accessories",
    ]),
    tags: z.array(z.string()).optional(), //TODO may remove this depending on the need
  });
  return updateProductSchema.safeParse(value);
}
