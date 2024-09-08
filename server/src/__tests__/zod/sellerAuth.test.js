import { validateSellerBody } from "../../services/index.js";

describe("testing the valid seller signup body", () => {
  const data = [
    {
      statement: "Should return false due to missing seller_name",
      input: {
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to empty seller_name",
      input: {
        name: "",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
      },
      output: false,
    },

    {
      statement: "Should return false due to missing seller_address",
      input: {
        seller_name: "John's Store",
        seller_contact_number: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to empty seller_address",
      input: {
        seller_name: "John's Store",
        seller_address: "",
        seller_contact_number: "1234567890",
      },
      output: false,
    },
    {
      statement: "Should return false due to missing seller_contact_number",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to contact number less than 10 digits",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "123456789",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to contact number more than 10 digits",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "12345678901",
      },
      output: false,
    },
    {
      statement:
        "Should return false due to non-digit characters in contact number",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "123-456-7890",
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid seller_url",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_url: "not-a-url",
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid seller_email",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_email: "not-an-email",
      },
      output: false,
    },
    {
      statement: "Should return false due to seller_bio exceeding max length",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_bio: "a".repeat(501),
      },
      output: false,
    },
    {
      statement:
        "Should return false due to seller_description exceeding max length",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_description: "a".repeat(1001),
      },
      output: false,
    },
    {
      statement: "Should return true for valid input with all fields",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_url: "https://johnsstore.com",
        seller_email: "john@example.com",
        seller_bio: "A great store",
        seller_description: "We sell everything you need",
      },
      output: true,
    },
    {
      statement: "Should return true for valid input with only required fields",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
      },
      output: true,
    },
    {
      statement: "Should return true for valid input with some optional fields",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_url: "https://johnsstore.com",
        seller_bio: "A great store",
      },
      output: true,
    },
    {
      statement:
        "Should return true for valid input with different optional fields",
      input: {
        seller_name: "John's Store",
        seller_address: "123 Main St",
        seller_contact_number: "1234567890",
        seller_email: "john@example.com",
        seller_description: "We sell everything you need",
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
