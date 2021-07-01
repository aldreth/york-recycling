const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCodeValidator =
  "(?:Y|y)(?:O|o)[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}";
const postCodeValidatorRegEx = new RegExp(postCodeValidator);

const householdsUrl = (postCode: string): string =>
  `${baseUrl}/getPropertiesForPostCode?postcode=${postCode.replace(
    /\s+/g,
    ""
  )}`;

const collectionsUrl = (uprn: string): string =>
  `${baseUrl}/getWasteCollectionDatabyUprn?uprn=${uprn}`;

const parseCollectionDtos = (
  collectionInfo: NewCollectionInfoDto[]
): CollectionInfo[] =>
  collectionInfo.map((e, idx) => {
    let timestamp = Date.parse(e.nextCollection);
    if (!timestamp) {
      timestamp = -1;
    }

    return {
      wasteTypeDescription: `${e.service || ""}`,
      service: e.service,
      icon: e.icon,
      title: e.title,
      collectionDay: `${e.frequency || ""}`,
      collectionFrequency: `${e.frequency || ""}`,
      collectionPoint: `${e.collectionLocation || ""}`,
      binDescription: `${e.binDescription || ""}`,
      wasteType: `${e.wasteType || ""}`,
      timestamp,
      key: `${timestamp}-${e.wasteType?.replace(/\s+/g, "-") || idx}`,
    };
  });

const getToday = () => {
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  return day;
};

const isToday = (date: Date): boolean => {
  date.setHours(0, 0, 0, 0);
  return date.getTime() === getToday().getTime();
};

const getTomorrow = () => {
  const day = getToday();
  day.setDate(day.getDate() + 1);
  return day;
};

const isTomorrow = (date: Date): boolean => {
  date.setHours(0, 0, 0, 0);
  return date.getTime() === getTomorrow().getTime();
};

const formattedDate = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
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

const compareHouseholds = (a: Household, b: Household): 0 | 1 | -1 => {
  const addressA = a.ShortAddress.toUpperCase();
  const addressB = b.ShortAddress.toUpperCase();

  if (addressA > addressB) {
    return 1;
  }
  if (addressA < addressB) {
    return -1;
  }
  return 0;
};

const collectionInfoReducer = (
  result: CollectionInfo[],
  current: CollectionInfo
) =>
  result.find((r) => r.key === current.key) ? result : [...result, current];

const mergeCollectionInfos = (
  currentCollectionInfos: CollectionInfo[],
  newCollectionInfo: CollectionInfo[]
): CollectionInfo[] => {
  return [...currentCollectionInfos, ...newCollectionInfo]
    .reduce(collectionInfoReducer, [])
    .filter((e) => e.timestamp !== -1 && e.timestamp >= getToday().getTime())
    .sort((a, b) => a.timestamp - b.timestamp);
};

export {
  householdsUrl,
  collectionsUrl,
  parseCollectionDtos,
  postCodeValidator,
  postCodeValidatorRegEx,
  compareHouseholds,
  mergeCollectionInfos,
  formattedDate,
  isToday,
  isTomorrow,
};
