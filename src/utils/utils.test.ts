/* eslint-disable */
import { advanceTo, clear } from "jest-date-mock";

import {
  householdsUrl,
  collectionsUrl,
  isToday,
  isTomorrow,
  formattedDate,
  parseCollectionDtos,
  mergeCollectionInfos,
  noneFound,
} from "./utils";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCode = "YO24 1DD";
const today = new Date(2020, 1, 16, 0, 0, 0);
const laterToday = new Date(2020, 1, 16, 12, 30, 0);
const tomorrow = new Date(2020, 1, 17, 12, 30, 0);
const yesterday = new Date(2020, 1, 15, 12, 30, 0);
const may27 = new Date(2020, 4, 27, 12, 0, 0);
const may28 = new Date(2020, 4, 28, 12, 0, 0);

const collectionInfoDtos: CollectionInfoDto[] = [
  {
    UPRN: 100050583299,
    ShortAddress: "84 SCARCROFT ROAD",
    PropertyNumber: "84",
    PropertyName: null,
    Street: "SCARCROFT ROAD",
    Locality: null,
    Postcode: "YO24 1DD",
    WasteType: "KERBSIDE",
    WasteTypeDescription: "Kerbside Collection",
    CollectionAvailable: "Y",
    NextCollection: "/Date(1591743600000)/",
    LastCollection: "/Date(1590534000000)/",
    CollectionDay: "WED",
    CollectionDayFull: "Wednesday",
    BinType: "BOX 55",
    BinTypeDescription: "Box 55L",
    MaterialsCollected: "Paper/Card : Plastic/Cans : Glass",
    Provider: "City of York Council",
    RoundNumber: "TERRACE A",
    RoundNumberDescription: "Terrace A",
    AlternativeRoundNumber: null,
    AlternativeRoundNumberDescription: null,
    ProviderShort: "CYC",
    Ward: "Micklegate",
    CollectionCalendar: "E",
    CollectionTypeDescription: "Kerbside Collection",
    ImageName: "box",
    CollectionFrequency: "Alternate Weeks",
    CollectionFrequencyShort: "WEEK 1",
    CollectionPoint: "FRONT",
    CollectionPointDescription: "Edge of Property at Front",
    CollectionPointLocation: null,
    NumberOfBins: "3",
    SaonNo: null,
    SaonName: null,
    CollectionType: "KERBSIDE",
    Frequency: {
      ExcludeSunday: null,
      FrequencyInDays: 14,
      StartingWeekNumber: 2,
    },
    CollectionDayOfWeek: 3,
  },
  {
    UPRN: 100050583299,
    ShortAddress: "84 SCARCROFT ROAD",
    PropertyNumber: "84",
    PropertyName: null,
    Street: "SCARCROFT ROAD",
    Locality: null,
    Postcode: "YO24 1DD",
    WasteType: "GREY BIN/SACK",
    WasteTypeDescription: "Grey Bin/Black Sack Collection",
    CollectionAvailable: "Y",
    NextCollection: "/Date(1591138800000)/",
    LastCollection: "/Date(1589929200000)/",
    CollectionDay: "WED",
    CollectionDayFull: "Wednesday",
    BinType: "GREY 180",
    BinTypeDescription: "Grey Bin 180L",
    MaterialsCollected: "General Domestic",
    Provider: "City of York Council",
    RoundNumber: "4",
    RoundNumberDescription: "Round 4",
    AlternativeRoundNumber: null,
    AlternativeRoundNumberDescription: null,
    ProviderShort: "CYC",
    Ward: "Micklegate",
    CollectionCalendar: "E",
    CollectionTypeDescription: "Grey Bin/Black Sack Collection",
    ImageName: "blackbin",
    CollectionFrequency: "Alternate Weeks",
    CollectionFrequencyShort: "WEEK 2",
    CollectionPoint: "FRONT",
    CollectionPointDescription: "Edge of Property at Front",
    CollectionPointLocation: null,
    NumberOfBins: "1",
    SaonNo: null,
    SaonName: null,
    CollectionType: "GREY BIN/SACK",
    Frequency: {
      ExcludeSunday: null,
      FrequencyInDays: 14,
      StartingWeekNumber: 1,
    },
    CollectionDayOfWeek: 3,
  },
  {
    UPRN: 100050583299,
    ShortAddress: "84 SCARCROFT ROAD",
    PropertyNumber: "84",
    PropertyName: null,
    Street: "SCARCROFT ROAD",
    Locality: null,
    Postcode: "YO24 1DD",
    WasteType: "GREEN",
    WasteTypeDescription: "Green Collection",
    CollectionAvailable: "Y",
    NextCollection: "/Date(1591311600000)/",
    LastCollection: "/Date(1590102000000)/",
    CollectionDay: "FRI",
    CollectionDayFull: "Friday",
    BinType: "GREEN 180",
    BinTypeDescription: "Green Bin 180L",
    MaterialsCollected: "Garden Waste",
    Provider: "City of York Council",
    RoundNumber: "4",
    RoundNumberDescription: "Round 4",
    AlternativeRoundNumber: null,
    AlternativeRoundNumberDescription: null,
    ProviderShort: "CYC",
    Ward: "Micklegate",
    CollectionCalendar: "E",
    CollectionTypeDescription: "Green Collection",
    ImageName: "greenbin",
    CollectionFrequency: "Alternate Weeks",
    CollectionFrequencyShort: "WEEK 2",
    CollectionPoint: "FRONT",
    CollectionPointDescription: "Edge of Property at Front",
    CollectionPointLocation: null,
    NumberOfBins: "1",
    SaonNo: null,
    SaonName: null,
    CollectionType: "GREEN",
    Frequency: {
      ExcludeSunday: null,
      FrequencyInDays: 14,
      StartingWeekNumber: 1,
    },
    CollectionDayOfWeek: 5,
  },
];

const cI27May = {
  wasteTypeDescription: "in the past",
  nextCollectionDate: "Wednesday, 27 May 2020",
  collectionDay: "Wednesday",
  collectionFrequency: "Alternate Weeks",
  collectionPoint: "Edge of Property at Front",
  binDescription: "3 x Box 55L",
  wasteType: "KERBSIDE",
  timestamp: 1590534000000,
  key: "1590534000000-KERBSIDE",
};

const cI3June = {
  wasteTypeDescription: "Grey Bin/Black Sack Collection",
  collectionDay: "Wednesday",
  collectionFrequency: "Alternate Weeks",
  collectionPoint: "Edge of Property at Front",
  binDescription: "1 x Grey Bin 180L",
  wasteType: "GREY BIN/SACK",
  timestamp: 1591138800000,
  key: "1591138800000-GREY-BIN/SACK",
};
const cI5June = {
  wasteTypeDescription: "Green Collection",
  collectionDay: "Friday",
  collectionFrequency: "Alternate Weeks",
  collectionPoint: "Edge of Property at Front",
  binDescription: "1 x Green Bin 180L",
  wasteType: "GREEN",
  timestamp: 1591311600000,
  key: "1591311600000-GREEN",
};
const cI10June = {
  wasteTypeDescription: "Kerbside Collection",
  collectionDay: "Wednesday",
  collectionFrequency: "Alternate Weeks",
  collectionPoint: "Edge of Property at Front",
  binDescription: "3 x Box 55L",
  wasteType: "KERBSIDE",
  timestamp: 1591743600000,
  key: "1591743600000-KERBSIDE",
};
const cIbadDate = {
  wasteTypeDescription: "bad date",
  collectionDay: "Wednesday",
  collectionFrequency: "Alternate Weeks",
  collectionPoint: "Edge of Property at Front",
  binDescription: "3 x Box 55L",
  wasteType: "KERBSIDE",
  timestamp: -1,
  key: "-1-KERBSIDE",
};

const collectionInfos = [cI10June, cI3June, cI5June];

const collectionInfos2 = [
  {
    wasteTypeDescription: "Kerbside Collection",
    collectionDay: "Wednesday",
    collectionFrequency: "Alternate Weeks",
    collectionPoint: "Edge of Property at Front",
    binDescription: "3 x Box 55L",
    wasteType: "KERBSIDE",
    timestamp: 1591743600000,
    key: "1591743600000-KERBSIDE",
  },
  {
    wasteTypeDescription: "Grey Bin/Black Sack Collection",
    collectionDay: "Wednesday",
    collectionFrequency: "Alternate Weeks",
    collectionPoint: "Edge of Property at Front",
    binDescription: "1 x Grey Bin 180L",
    wasteType: "GREY BIN/SACK",
    timestamp: 1591138800000,
    key: "1591138800000-GREY-BIN/SACK",
  },
  {
    wasteTypeDescription: "Green Collection",
    collectionDay: "Friday",
    collectionFrequency: "Alternate Weeks",
    collectionPoint: "Edge of Property at Front",
    binDescription: "1 x Green Bin 180L",
    wasteType: "GREEN",
    timestamp: 1591311600000,
    key: "1591311600000-GREEN",
  },
];

describe("utils", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("householdsUrl is correct", () => {
    expect(householdsUrl(postCode)).toEqual(
      `${baseUrl}/getPropertiesForPostCode?postcode=YO241DD`
    );
  });

  it("collectionsUrl is correct", () => {
    expect(collectionsUrl("100050583299")).toEqual(
      `${baseUrl}/getWasteCollectionDatabyUprn?uprn=100050583299`
    );
  });

  describe("today & tomorrow helpers", () => {
    beforeEach(() => {
      advanceTo(today);
    });

    afterEach(() => {
      clear();
    });

    describe("isToday", () => {
      it("isToday is true for today", () => {
        expect(isToday(laterToday)).toBeTruthy();
      });

      it("isToday is false for tomorrow", () => {
        expect(isToday(tomorrow)).toBeFalsy();
      });

      it("isToday is false for yesterday", () => {
        expect(isToday(yesterday)).toBeFalsy();
      });
    });

    describe("isTomorrow", () => {
      it("isTomorrow is false for today", () => {
        expect(isTomorrow(laterToday)).toBeFalsy();
      });

      it("isTomorrow is true for tomorrow", () => {
        expect(isTomorrow(tomorrow)).toBeTruthy();
      });

      it("isTomorrow is false for yesterday", () => {
        expect(isTomorrow(yesterday)).toBeFalsy();
      });
    });
  });

  describe("formattedDate", () => {
    it("returns a string if date isn't formatted correctly", () => {
      expect(formattedDate(-1)).toEqual("Invalid date format");
    });

    it("parses a correctly formatted date as expected", () => {
      advanceTo(today);
      expect(formattedDate(1582675200000)).toEqual(
        "Wednesday, 26 February 2020"
      );
      clear();
    });

    it("returns 'Today' for today", () => {
      advanceTo(today);
      expect(formattedDate(1581811200000)).toEqual("Today");
      clear();
    });

    it("returns 'Tomorrow' for tomorrow", () => {
      advanceTo(today);
      expect(formattedDate(1581942600000)).toEqual("Tomorrow");
      clear();
    });
  });

  // describe.skip("parseCollectionDtos", () => {
  //   it("parses data", () => {
  //     expect(parseCollectionDtos(collectionInfoDtos)).toEqual(collectionInfos);
  //   });

  //   it("copes with bad dates", () => {
  //     const badDateCollection = {
  //       ...collectionInfoDtos[0],
  //       NextCollection: "/Date(-1591743600000)/",
  //     };
  //     expect(parseCollectionDtos([badDateCollection])).toEqual([
  //       {
  //         binDescription: "3 x Box 55L",
  //         collectionDay: "Wednesday",
  //         collectionFrequency: "Alternate Weeks",
  //         collectionPoint: "Edge of Property at Front",
  //         key: "-1-KERBSIDE",
  //         timestamp: -1,
  //         wasteType: "KERBSIDE",
  //         wasteTypeDescription: "Kerbside Collection",
  //       },
  //     ]);
  //   });
  // });

  // describe("mergeCollectionInfos", () => {
  //   beforeEach(() => {
  //     advanceTo(may28);
  //   });

  //   afterEach(() => {
  //     clear();
  //   });

  //   it("merges correctly with an empty current state", () => {
  //     expect(mergeCollectionInfos([], collectionInfos)).toEqual([
  //       cI3June,
  //       cI5June,
  //       cI10June,
  //     ]);
  //   });

  //   it("dedupes", () => {
  //     expect(mergeCollectionInfos(collectionInfos, collectionInfos2)).toEqual([
  //       cI3June,
  //       cI5June,
  //       cI10June,
  //     ]);
  //   });

  //   it("sorts", () => {
  //     expect(mergeCollectionInfos(collectionInfos, collectionInfos)).toEqual([
  //       cI3June,
  //       cI5June,
  //       cI10June,
  //     ]);
  //   });

  //   it("removes collections in the past", () => {
  //     expect(mergeCollectionInfos([...collectionInfos, cI27May], [])).toEqual([
  //       cI3June,
  //       cI5June,
  //       cI10June,
  //     ]);
  //   });

  //   it("keeps collections for today", () => {
  //     advanceTo(may27);
  //     expect(mergeCollectionInfos([...collectionInfos, cI27May], [])).toEqual([
  //       cI27May,
  //       cI3June,
  //       cI5June,
  //       cI10June,
  //     ]);
  //   });

  //   it("copes with bad dates", () => {
  //     expect(
  //       mergeCollectionInfos([...collectionInfos, cIbadDate], [])
  //     ).toEqual([cI3June, cI5June, cI10June]);
  //   });
  // });

  describe("notFound", () => {
    describe("notReady", () => {
      it("data undefined", () => {
        expect(noneFound(false, undefined)).toEqual(false);
      });

      it("data empty", () => {
        expect(noneFound(false, [])).toEqual(false);
      });

      it("with data", () => {
        expect(
          noneFound(false, [
            { uprn: "uprn", address: "address" },
            { uprn: "uprn1", address: "address1" },
          ])
        ).toEqual(false);
      });
    });

    describe("ready", () => {
      it("data undefined", () => {
        expect(noneFound(true, undefined)).toEqual(true);
      });

      it("data empty", () => {
        expect(noneFound(true, [])).toEqual(true);
      });

      it("with data", () => {
        expect(
          noneFound(true, [
            { uprn: "uprn", address: "address" },
            { uprn: "uprn1", address: "address1" },
          ])
        ).toEqual(false);
      });
    });
  });
});

/* eslint-enable */
