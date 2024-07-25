import { hashPassword, verifyPassword } from "../../services/index.js";

describe("Testing  bycrpt hashing", () => {
  it("should return hashed password", async () => {
    const password = "datta";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword.length).toBe(60);
  });
});

describe("Testing  bycrpt comparing", () => {
  it("should return hashed password", async () => {
    const password = "datta";
    const hashedPassword = await hashPassword(password);
    let res = await verifyPassword(password, hashedPassword);
    expect(res).toBe(true);
  });
});
