export const defaultHouseHoldObject: Household = {
  Uprn: undefined,
};

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCodeValidator =
  "(?:Y|y)(?:O|o)[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}";

const householdsUrl = (postCode: string) =>
  `${baseUrl}/getPropertiesForPostCode?postcode=${postCode.replace(
    /\s+/g,
    ""
  )}`;

const collectionsUrl = (uprn: string) =>
  `${baseUrl}/getWasteCollectionDatabyUprn?uprn=${uprn}`;

const sortedCollections = (
  collectionInfo: CollectionInfoDto[]
): CollectionInfo[] =>
  collectionInfo
    .map((e) => {
      const matches = e.NextCollection.match(/\/Date\((\d*)\)\//);
      const timestamp = Array.isArray(matches) ? parseInt(matches[1]) : -1;
      return {
        wasteTypeDescription: `${e.WasteTypeDescription}`,
        nextCollectionDate: formattedDate(timestamp),
        collectionDay: `${e.CollectionDayFull}`,
        collectionFrequency: `${e.CollectionFrequency}`,
        collectionPoint: `${
          e.CollectionPointLocation || e.CollectionPointDescription
        }`,
        binDescription: `${e.NumberOfBins} x ${e.BinTypeDescription}`,
        wasteType: `${e.WasteType}`,
        timestamp,
      };
    })
    .filter((e) => e.timestamp === -1 || e.timestamp > new Date().getTime())
    .sort((a, b) => a.timestamp - b.timestamp);

// const collectionInfoDataOutOfDate = collectionInfoData => {
//   if (!collectionInfoData.fetched) {
//     return "no";
//   }

//   const firstCollection = collectionInfoData.collectionInfo[0];
//   return firstCollection.timestamp > Date.now() ? "no" : string | null;
// };

const isToday = (date: Date) => {
  const today = new Date();
  return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
};

const isTomorrow = (date: Date) => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
};

const formattedDate = (timestamp: number) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (timestamp === -1) {
    return "Invalid date format";
  }

  const date = new Date(timestamp);
  if (isToday(date)) {
    return "Today";
  }
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-GB", options);
};

export {
  formattedDate,
  householdsUrl,
  collectionsUrl,
  sortedCollections,
  postCodeValidator,
  isToday,
  isTomorrow,
};
