import { z } from "zod";

export function validateReviewBody(value) {
  const reviewSchema = z.object({
    review: z.string().min(1, "Review is required"),
    star: z
      .number()
      .min(1, "Star rating must be between 1 and 5")
      .max(5, "Star rating must be between 1 and 5"),
  });
  return reviewSchema.safeParse(value);
}
