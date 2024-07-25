import { validateReviewBody } from "../../services/index.js";
describe("validateReviewBody function", () => {
  const cases = [
    {
      statement:
        "Should return true for valid review body with positive integer productId",
      input: {
        review: "Great product!",
        star: 5,
      },
      output: true,
    },
    {
      statement: "Should return false due to missing review",
      input: {
        star: 4,
      },
      output: false,
    },
    {
      statement: "Should return false due to empty review",
      input: {
        review: "",
        star: 3,
      },
      output: false,
    },
    {
      statement: "Should return false due to star rating below minimum",
      input: {
        review: "Could be better.",
        star: 0,
      },
      output: false,
    },
    {
      statement: "Should return false due to star rating above maximum",
      input: {
        review: "Perfect!",
        star: 6,
      },
      output: false,
    },
    {
      statement: "Should return false due to invalid star rating type",
      input: {
        review: "Not bad.",
        star: "three",
      },
      output: false,
    },
  ];

  cases.forEach(({ statement, input, output }) => {
    it(statement, () => {
      const result = validateReviewBody(input);
      expect(result.success).toBe(output);
    });
  });
});
