const fetch = require("node-fetch");

const API_ENDPOINT = "https://cat-fact.herokuapp.com/facts";

exports.handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

// const fetch = require("node-fetch");

// exports.handler = async function (event, context) {
//   try {
//     const response = await fetch(
//       "https://addresses.york.gov.uk/api/address/lookupbypostcode/YO24%201DD",
//       {
//         method: "GET",
//         headers: {},
//       }
//     );
//     return {
//       statusCode: 200,
//       body: JSON.stringify(response),
//     };
//   } catch (error) {
//     const { statusCode = 500, message = "Something's gone wrong" } = error;
//     return {
//       statusCode,
//       body: JSON.stringify({
//         error: message,
//       }),
//     };
//   }
// };
