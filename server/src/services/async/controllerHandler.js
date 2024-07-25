// import { ApiResponse } from "../response/apiResponse";

// export const handler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res
//       .status(err.statusCode || 500)
//       .json(new ApiResponse(err.statusCode, err.message, err.data));
//   }
// };

export const handler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
