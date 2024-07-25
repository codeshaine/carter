import prismaClient from "../../clients/prismaClient.js";
import {
  ApiResponse,
  ApiError,
  hashPassword,
  validateSignInBody,
  validateSignUpBody,
  verifyPassword,
} from "../../services/index.js";

async function signUp(req, res) {
  const validate = validateSignUpBody(req.body);
  if (!validate.success) {
    throw new ApiError(400, "invalid user data", validate.error);
  }

  const { name, email, password: rawPassword } = req.body;
  const password = await hashPassword(rawPassword);
  try {
    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        password,
      },
    });
    req.session.user = user.user_id;
    delete user["password"];
    return res.status(201).json(new ApiResponse(201, "created", user));
  } catch (err) {
    if (err.code === "P2002" && err.meta && err.meta.target.includes("email")) {
      throw new ApiError(409, "email already taken", err);
    } else {
      // Handle other errors
      throw new ApiError(500, "Error occurred while creating user", err);
    }
  }
}

async function signIn(req, res) {
  const validate = validateSignInBody(req.body);
  if (!validate.success) {
    throw new ApiError(400, "invalid user data", validate.error);
  }
  const { email, password } = req.body;
  let user;
  try {
    user = await prismaClient.users.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    throw new ApiError(500, "Error occured during user login query", err);
  }
  if (!user) {
    throw new ApiError(400, "user not exist");
  }

  const validatePassword = await verifyPassword(password, user.password);

  if (!validatePassword) {
    throw new ApiError(400, "invalid password");
  }
  delete user["password"];
  req.session.user = user.user_id;
  return res.status(200).json(new ApiResponse(200, "login successfully", user));
}

async function signOut(req, res) {
  try {
    !req.user && req.session.destroy();
    req.user && req.logout((err) => console.log(err));
    return res.status(200).json(new ApiResponse(200, "logged out"));
  } catch (err) {
    throw new ApiError(500, "Erroc occured during logout", err.stack);
  }
}
export { signUp, signIn, signOut };
