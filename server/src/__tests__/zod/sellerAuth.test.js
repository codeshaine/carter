import { validateSellerBody } from "../../services/index.js";

describe("testing the valid seller signup body", () => {
  const data = [
    {
      statement: "Should return false due to missing name",
      input: {
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to empty name",
      input: {
        name: "",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to missing logoUrl",
      input: {
        name: "John's Store",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid logoUrl",
      input: {
        name: "John's Store",
        logoUrl: "not-a-url",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to missing sellerAddress",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to empty sellerAddress",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "",
        contactNumber: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to missing contactNumber",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to contact number less than 10 digits",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "123456789",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to contact number more than 10 digits",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "12345678901",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to non-digit characters in contact number",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "123-456-7890",
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid sellerUrl",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        sellerUrl: "not-a-url",
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid sellerEmail",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        sellerEmail: "not-an-email",
      },
      output: false,
    },
    {
      statement: "Should return false due to bio exceeding max length",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        bio: "a".repeat(501),
      },
      output: false,
    },
    {
      statement: "Should return false due to description exceeding max length",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        description: "a".repeat(1001),
      },
      output: false,
    },
    {
      statement: "Should return true for valid input with all fields",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        sellerUrl: "https://johnsstore.com",
        sellerEmail: "john@example.com",
        bio: "A great store",
        description: "We sell everything you need",
      },
      output: true,
    },
    {
      statement: "Should return true for valid input with only required fields",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
      },
      output: true,
    },
    {
      statement: "Should return true for valid input with some optional fields",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        sellerUrl: "https://johnsstore.com",
        bio: "A great store",
      },
      output: true,
    },
    {
      statement:
        "Should return true for valid input with different optional fields",
      input: {
        name: "John's Store",
        logoUrl: "https://example.com/logo.png",
        sellerAddress: "123 Main St",
        contactNumber: "1234567890",
        sellerEmail: "john@example.com",
        description: "We sell everything you need",
      },
      output: true,
    },
  ];

  data.forEach((ele) => {
    it(ele.statement, () => {
      const result = validateSellerBody(ele.input);
      expect(result.success).toBe(ele.output);
    });
  });
});
