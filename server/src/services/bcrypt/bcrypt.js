import bcrypt from "bcrypt";
import { ApiError } from "../response/apiError.js";

export async function verifyPassword(password, hashedPassword) {
  const res = await bcrypt.compare(password, hashedPassword);
  return res;
}

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    // console.log(err);
    throw new ApiError(500, "Error occured  during hashing", {});
  }
}
