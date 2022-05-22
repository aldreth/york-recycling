import fetch from "node-fetch";

const COLLECTION_DETAILS_API_ENDPOINT =
  "https://waste-api.york.gov.uk/api/Collections/GetBinCollectionDataForUprn/";
const COLLECTION_LOCATION_API_ENDPOINT =
  "https://waste-api.york.gov.uk/api/Collections/GetBinCollectionLocationForUprn/";

const getIcon = (service) => {
  let icon;
  switch (service) {
    case "REFUSE":
      icon = "🗑";
      break;
    case "RECYCLING":
      icon = "♲";
      break;
    case "GARDEN":
      icon = "🌳";
      break;
    default:
      break;
  }
  return icon;
};
const getTitle = (service) => {
  let title;
  switch (service) {
    case "REFUSE":
      title = "Household waste collection";
      break;
    case "RECYCLING":
      title = "Recycling collection";
      break;
    case "GARDEN":
      title = "Garden waste collection";
      break;
    default:
      break;
  }
  return title;
};

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

    console.log("************", { detailsJson, locationJson });

    const collections = detailsJson.services.map((j) => ({
      title: getTitle(j.service),
      icon: getIcon(j.service),
      service: j.service,
      nextCollection: j.nextCollection,
      frequency: j.frequency,
      binDescription: j.binDescription.toLowerCase(),
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
