const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";

const householdsUrl = postCode =>
  `${baseUrl}/getPropertiesForPostCode?postcode=${postCode.replace(
    /\s+/g,
    ""
  )}`;

const collectionsUrl = uprn =>
  `${baseUrl}/getWasteCollectionDatabyUprn?uprn=${uprn}`;

const defaultPostCode = () => window.localStorage.getItem("postCode") || "";

const defaultHousehold = () =>
  JSON.parse(window.localStorage.getItem("household")) || {};

const defaultHouseholdsData = () =>
  JSON.parse(window.localStorage.getItem("householdsData")) || {
    fetched: false,
    households: []
  };

const defaultCollectionInfoData = () =>
  JSON.parse(window.localStorage.getItem("collectionInfoData")) || {
    fetched: false,
    collectionInfo: []
  };

const collectionInfoDataOutOfDate = collectionInfoData => {
  if (!collectionInfoData.fetched) {
    return "no";
  }

  const sortedCollections = collectionInfoData.collectionInfo
    .map(e => {
      const matches = e.NextCollection.match(/\/Date\((\d*)\)\//);

      const timestamp = Array.isArray(matches) ? parseInt(matches[1]) : 9e20;
      return {
        ...e,
        timestamp
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  const firstCollection = sortedCollections[0];
  return firstCollection.timestamp > Date.now() ? "no" : "yes";
};

export {
  householdsUrl,
  collectionsUrl,
  defaultPostCode,
  defaultHousehold,
  defaultHouseholdsData,
  defaultCollectionInfoData,
  collectionInfoDataOutOfDate
};
