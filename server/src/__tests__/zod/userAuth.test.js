import { validateSignInBody, validateSignUpBody } from "../../services";

describe("testing the valid user signup body", () => {
  const data = [
    {
      statement: "Should return false due to One field is missing",
      input: {
        email: "veek@gmail.com",
        password: "1234545",
      },
      output: false,
    },
    {
      statement: "Should return false due to name  has numerical",
      input: {
        name: "John1",
        email: "veek@gmail.com",
        password: "password",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to password has non required character",
      input: {
        name: "user",
        email: "veek@gmail.com",
        password: "'password",
      },
      output: false,
    },
    {
      statement: "Should return true due to valid  input",
      input: {
        name: "Agnex",
        email: "veek@gmail.com",
        password: "123456",
      },
      output: true,
    },
    {
      statement: "Should return false due to the password is too short",
      input: {
        name: "Agnex",
        email: "veek@gmail.com",
        password: "12345",
      },
      output: false,
    },
    {
      statement: "Should return false due to email is not valid",
      input: {
        name: "Agnex",
        email: "axiozgmail.com",
        password: "12345",
      },
      output: false,
    },
  ];
  data.forEach((ele) => {
    it(ele.statement, () => {
      const result = validateSignUpBody(ele.input);
      expect(result.success).toBe(ele.output);
    });
  });
});

describe("testing the valid user signin body", () => {
  const data = [
    {
      statement: "Should return false due to One field is missing",
      input: {
        email: "john@gmail.com",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to unsupported characters in password",
      input: {
        email: "veek@gmail.com",
        password: "password'",
      },
      output: false,
    },
    {
      statement: "should return true",
      input: {
        email: "veek@gmail.com",
        password: "password",
      },
      output: true,
    },
  ];
  data.forEach((ele) => {
    it(ele.statement, () => {
      const result = validateSignInBody(ele.input);
      expect(result.success).toBe(ele.output);
    });
  });
});
