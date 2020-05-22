import { CollectionInfo, Household } from "types";

export const defaultHouseHoldObject: Household = {
  Uprn: undefined
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
  collectionInfo: CollectionInfo[]
): CollectionInfo[] =>
  collectionInfo
    .map(e => {
      const matches = e.NextCollection.match(/\/Date\((\d*)\)\//);

      const timestamp = Array.isArray(matches) ? parseInt(matches[1]) : 9e20;
      return {
        ...e,
        timestamp
      };
    })
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

const formattedDate = (string: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const match = string.match(/\/Date\((\d*)\)\//);
  if (!match || match.length < 2) {
    return ("Invalid date format");
  }
  const timestamp = match[1];
  const date = new Date(parseInt(timestamp));
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
  isTomorrow
};
