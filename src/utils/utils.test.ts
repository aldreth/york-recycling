import { advanceTo, clear } from "jest-date-mock";
import {
  householdsUrl,
  collectionsUrl,
  isToday,
  isTomorrow,
  formattedDate,
  sortedCollections,
} from "./utils";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCode = "YO24 1DD";
const today = new Date(2020, 1, 16, 0, 0, 0);
const laterToday = new Date(2020, 1, 16, 12, 30, 0);
const tomorrow = new Date(2020, 1, 17, 12, 30, 0);
const yesterday = new Date(2020, 1, 15, 12, 30, 0);
const may28 = new Date(2020, 4, 28, 12, 0, 0);

const collectionInfos: CollectionInfoDto[] = [
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

const badDateCollection = {
  ...collectionInfos[0],
  NextCollection: "/Date(-1591743600000)/",
  WasteTypeDescription: "bad date",
};

const inThePastCollection = {
  ...collectionInfos[0],
  NextCollection: "/Date(1590534000000)/",
  WasteTypeDescription: "in the past",
};
// const household = { some: "info" };
// const oneDayInSeconds = 24 * 60 * 60 * 1000;

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

  describe("sortedCollections", () => {
    beforeEach(() => {
      advanceTo(may28);
    });

    afterEach(() => {
      clear();
    });

    it("sorts and munges", () => {
      expect(sortedCollections(collectionInfos)).toEqual([
        {
          binDescription: "1 x Grey Bin 180L",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          nextCollectionDate: "Wednesday, 3 June 2020",
          wasteType: "GREY BIN/SACK",
          wasteTypeDescription: "Grey Bin/Black Sack Collection",
          timestamp: 1591138800000,
        },
        {
          binDescription: "1 x Green Bin 180L",
          collectionDay: "Friday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          nextCollectionDate: "Friday, 5 June 2020",
          wasteType: "GREEN",
          wasteTypeDescription: "Green Collection",
          timestamp: 1591311600000,
        },
        {
          binDescription: "3 x Box 55L",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          nextCollectionDate: "Wednesday, 10 June 2020",
          wasteType: "KERBSIDE",
          wasteTypeDescription: "Kerbside Collection",
          timestamp: 1591743600000,
        },
      ]);
    });

    it("copes with bad dates", () => {
      const badDateCollection = {
        ...collectionInfos[0],
        NextCollection: "/Date(-1591743600000)/",
      };
      expect(sortedCollections([badDateCollection])).toEqual([
        {
          binDescription: "3 x Box 55L",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          nextCollectionDate: "Invalid date format",
          wasteType: "KERBSIDE",
          wasteTypeDescription: "Kerbside Collection",
          timestamp: -1,
        },
      ]);
    });

    it("ignores dates in the past", () => {
      expect(
        sortedCollections([
          ...collectionInfos,
          inThePastCollection,
          badDateCollection,
        ])
      ).toEqual([
        {
          wasteTypeDescription: "bad date",
          nextCollectionDate: "Invalid date format",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          binDescription: "3 x Box 55L",
          wasteType: "KERBSIDE",
          timestamp: -1,
        },
        {
          wasteTypeDescription: "Grey Bin/Black Sack Collection",
          nextCollectionDate: "Wednesday, 3 June 2020",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          binDescription: "1 x Grey Bin 180L",
          wasteType: "GREY BIN/SACK",
          timestamp: 1591138800000,
        },
        {
          wasteTypeDescription: "Green Collection",
          nextCollectionDate: "Friday, 5 June 2020",
          collectionDay: "Friday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          binDescription: "1 x Green Bin 180L",
          wasteType: "GREEN",
          timestamp: 1591311600000,
        },
        {
          wasteTypeDescription: "Kerbside Collection",
          nextCollectionDate: "Wednesday, 10 June 2020",
          collectionDay: "Wednesday",
          collectionFrequency: "Alternate Weeks",
          collectionPoint: "Edge of Property at Front",
          binDescription: "3 x Box 55L",
          wasteType: "KERBSIDE",
          timestamp: 1591743600000,
        },
      ]);
    });
  });

  // describe("collectionInfoDataOutOfDate", () => {
  //   it("returns no if the data has not been fetched", () => {
  //     expect(
  //       collectionInfoDataOutOfDate({
  //         fetched: false,
  //         collectionInfo: []
  //       })
  //     ).toEqual("no");
  //   });

  //   it("returns no if the data is up to date", () => {
  //     const tomorrow = new Date();
  //     tomorrow.setTime(tomorrow.getTime() + oneDayInSeconds);
  //     const NextCollection = `\/Date(${tomorrow.getTime()})\/`;

  //     expect(
  //       collectionInfoDataOutOfDate({
  //         fetched: true,
  //         collectionInfo: [{ NextCollection }]
  //       })
  //     ).toEqual("no");
  //   });

  //   it("returns yes if the data is stale", () => {
  //     const yesterday = new Date();
  //     yesterday.setTime(yesterday.getTime() - oneDayInSeconds);
  //     const NextCollection = `\/Date(${yesterday.getTime()})\/`;

  //     expect(
  //       collectionInfoDataOutOfDate({
  //         fetched: true,
  //         collectionInfo: [{ NextCollection }]
  //       })
  //     ).toEqual("yes");
  //   });

  //   it("returns yes if two components & the second data is stale", () => {
  //     const tomorrow = new Date();
  //     tomorrow.setTime(tomorrow.getTime() + oneDayInSeconds);
  //     const tomorrowNextCollection = `\/Date(${tomorrow.getTime()})\/`;
  //     const yesterday = new Date();
  //     yesterday.setTime(yesterday.getTime() - oneDayInSeconds);
  //     const yesterdayNextCollection = `\/Date(${yesterday.getTime()})\/`;

  //     expect(
  //       collectionInfoDataOutOfDate({
  //         fetched: true,
  //         collectionInfo: [
  //           { NextCollection: tomorrowNextCollection },
  //           { NextCollection: yesterdayNextCollection }
  //         ]
  //       })
  //     ).toEqual("yes");
  //   });

  //   it("returns no if the data is fetched, but doesn't have dates that match the regex", () => {
  //     const NextCollection = "bad-string";

  //     expect(
  //       collectionInfoDataOutOfDate({
  //         fetched: true,
  //         collectionInfo: [{ NextCollection }]
  //       })
  //     ).toEqual("no");
  //   });
  // });
});
