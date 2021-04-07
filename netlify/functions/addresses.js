import fetch from "node-fetch";

exports.handler = async function (event, context) {
  fetch(
    "https://addresses.york.gov.uk/api/address/lookupbypostcode/YO24%201DD",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};
