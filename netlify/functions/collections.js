import fetch from "node-fetch";

const COLLECTION_DETAILS_API_ENDPOINT =
  "https://cyc-myaccount-live.azurewebsites.net/api/bins/GetCollectionDetails/";
const COLLECTION_LOCATION_API_ENDPOINT =
  "https://myaccount-api.york.gov.uk/api/bins/GetCollectionLocation/";

export async function handler(event, context) {
  const { uprn } = JSON.parse(event.body);

  if (!uprn) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Location info (uprn) missing",
      }),
    };
  }

  try {
    const detailsResponse = await fetch(
      `${COLLECTION_DETAILS_API_ENDPOINT}${uprn}`
    );
    const detailsJson = await detailsResponse.json();
    const locationResponse = await fetch(
      `${COLLECTION_LOCATION_API_ENDPOINT}${uprn}`
    );
    const locationJson = await locationResponse.json();

    const collections = detailsJson.services.map((j) => ({
      service: j.service,
      nextCollection: j.nextCollection,
      frequency: j.frequency,
      binDescription: j.binDescription,
      wasteType: j.wasteType,
      collectionLocation: locationJson.collectionLocation,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(collections),
    };
  } catch (error) {
    const { statusCode = 500, message = "Something's gone wrong" } = error;
    return {
      statusCode,
      body: JSON.stringify({
        error: message,
      }),
    };
  }
}
