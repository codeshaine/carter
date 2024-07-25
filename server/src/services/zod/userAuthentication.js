import { z } from "zod";

const validateSignUpBody = (value) => {
  const validSignUpBody = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      // .min(1, "Name is required")
      .regex(/^[a-zA-Z. ]+$/, "Name can only contain letters and dots"),
    email: z.string().email({
      required_error: "email is required",
      invalid_type_error: "email is not valid",
    }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "Name must be a string",
      })
      .min(6, "minimum length is 8")
      .regex(
        /^[^'";]*$/,
        "Password cannot contain single quotes, double quotes, or semicolons"
      ),
  });

  return validSignUpBody.safeParse(value);
};

const validateSignInBody = (value) => {
  const validSignInBody = z.object({
    email: z.string().email({
      required_error: "email is required",
      invalid_type_error: "email is not valid",
    }),

    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "Name must be a string",
      })
      .min(6, "minimum length is 8")
      .regex(
        /^[^'";]*$/,
        "Password cannot contain single quotes, double quotes, or semicolons"
      ),
  });

  return validSignInBody.safeParse(value);
};

const validateUpdateUserProfile = (value) => {
  const validUpdateUserProfile = z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .regex(/^[a-zA-Z. ]+$/, "Name can only contain letters and dots")
      .optional(),
    // profileUrl: z
    //   .string()
    //   .url({
    //     invalid_type_error: "logoUrl is not valid",
    //   })
    //   .optional(),
  });

  return validUpdateUserProfile.safeParse(value);
};
export { validateSignUpBody, validateSignInBody, validateUpdateUserProfile };
