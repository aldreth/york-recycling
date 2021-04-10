import fetch from "node-fetch";

const API_ENDPOINT =
  "https://addresses.york.gov.uk/api/address/lookupbypostcode/";

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  console.log("*********************", body);
  const encodedPostcode = encodeURIComponent("YO24 1DD");

  try {
    const response = await fetch(`${API_ENDPOINT}${encodedPostcode}`);
    const json = await response.json();
    console.log("***************", json);
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.error(err);
  }
}

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
