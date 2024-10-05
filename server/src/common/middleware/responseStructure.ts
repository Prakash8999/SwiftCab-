/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @author  Ripudaman Singh
 * @since   2020
 */

/**
 * @desc    Send any success response
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

export const success = (  message:string, results:any, statusCode:number, meta:any) => {
    return {
        status: "success",
        code: statusCode,
        error: false,
        meta: meta,
        data: results||[],
        message,
        assetsBaseUrl:process.env.r2_base_url
    };
};
  
  /**
   * @desc    Send any error response
   *
   * @param   {string} message
   * @param   {number} statusCode
   */
export const error = (message:string,  statusCode:number, err:any) => {
// List of common HTTP request code
const codes = [200, 201, 400, 401, 404, 403, 422, 500];

// Get matched code
const findCode = codes.find((code) => code == statusCode);

if (!findCode) statusCode = 500;
else statusCode = findCode;

// switch (statusCode) {
//     case 401:
//       res.json({
//         title: "Unauthorized",
//         message: err.message,
//       });
//       break;
//     case 404:
//       res.json({
//         title: "Not Found",
//         message: err.message,
//       });
//       break;
//     case 500:
//       res.json({
//         title: "Server Error",
//         message: err.message,
//       });
//       break;
//     default:
//       break;
//   }

return {
    status: "failed",
    code: statusCode,
    error: true,
    data: err||[],
    message,
};
};
  
/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
export const validation = (errors:any) => {
return {
    code: 422,
    error: true,
    data: errors||[],
    message: "Validation errors",
};
};
  