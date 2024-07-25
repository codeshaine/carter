import prismaClient from "../../clients/prismaClient.js";
import { signUp } from "../../controllers/user/authenticate.controller.js";

import {
  ApiError,
  ApiResponse,
  hashPassword,
  validateSignUpBody,
} from "../../services/index.js";
jest.mock("../../services");
jest.mock("../../clients/prismaClient.js", () => ({
  users: {
    create: jest.fn(),
  },
}));
describe("POST /api/user/signup", () => {
  let req, res, user;
  beforeEach(() => {
    req = {
      body: {
        name: "test-user",
        email: "test@gmial.com",
        password: "123456",
      },
      session: {
        user: undefined,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    user = {
      id: 1,
      name: "test-user",
      email: "test@gmial.com",
      password: "hashedPassword",
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate a request body and create new user", async () => {
    validateSignUpBody.mockReturnValue({ success: true });
    hashPassword.mockResolvedValue("hashedPassword");
    prismaClient.users.create.mockResolvedValue(user);

    await signUp(req, res);

    expect(validateSignUpBody).toHaveBeenCalledWith(req.body);
    expect(hashPassword).toHaveBeenCalledWith(req.body.password);
    expect(prismaClient.users.create).toHaveBeenCalledWith({
      data: {
        name: "test-user",
        email: "test@gmial.com",
        password: "hashedPassword",
      },
    });

    expect(req.session.user).toBe(user.user_id);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      new ApiResponse(201, "created", user)
    );
  });

  it("should hanlde validation error ", async () => {
    validateSignUpBody.mockReturnValue({
      success: false,
      error: "validation error",
    });

    await expect(signUp(req, res)).rejects.toBeInstanceOf(ApiError);
    // .toMatchObject({ message: "invalid user data" });

    expect(validateSignUpBody).toHaveBeenCalledWith(req.body);
    expect(hashPassword).not.toHaveBeenCalled();
    expect(prismaClient.users.create).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  it("should handle unique constraint violation for username", async () => {
    validateSignUpBody.mockReturnValue({ success: true });
    hashPassword.mockResolvedValue("hashedpassword");
    prismaClient.users.create.mockRejectedValue({
      code: "P2002",
      meta: { target: ["username"] },
    });

    await expect(signUp(req, res)).rejects.toBeInstanceOf(ApiError);

    expect(validateSignUpBody).toHaveBeenCalledWith(req.body);
    expect(hashPassword).toHaveBeenCalledWith("123456");
    expect(prismaClient.users.create).toHaveBeenCalledWith({
      data: {
        name: "test-user",
        email: "test@gmial.com",
        password: "hashedpassword",
      },
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  it("should handle general errors during user creation", async () => {
    validateSignUpBody.mockReturnValue({ success: true });
    hashPassword.mockResolvedValue("hashedpassword");
    prismaClient.users.create.mockRejectedValue(new Error("Database error"));

    await expect(signUp(req, res)).rejects.toBeInstanceOf(ApiError);
    expect(validateSignUpBody).toHaveBeenCalledWith(req.body);
    expect(hashPassword).toHaveBeenCalledWith("123456");
    expect(prismaClient.users.create).toHaveBeenCalledWith({
      data: {
        name: "test-user",
        email: "test@gmial.com",
        password: "hashedpassword",
      },
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
