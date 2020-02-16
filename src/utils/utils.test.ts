import { advanceTo, clear } from "jest-date-mock";
import {
  householdsUrl,
  collectionsUrl,
  formattedDate,
  isToday,
  isTomorrow
} from "./utils";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCode = "YO24 1DD";
const today = new Date(2020, 1, 16, 0, 0, 0);
const laterToday = new Date(2020, 1, 16, 12, 30, 0);
const tomorrow = new Date(2020, 1, 17, 12, 30, 0);
const yesterday = new Date(2020, 1, 15, 12, 30, 0);

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
    it("throws an error if the date isn't formatted correctly", () => {
      expect(() => formattedDate("bad date")).toThrowError(
        new Error("Invalid date format")
      );
    });

    it("parses a correctly formatted date as expected", () => {
      expect(formattedDate("/Date(1582675200000)/")).toEqual(
        "Wednesday, 26 February 2020"
      );
    });

    it("returns 'Today' for today", () => {
      advanceTo(today);
      expect(formattedDate("/Date(1581811200000)/")).toEqual("Today");
      clear();
    });

    it("returns 'Tomorrow' for tomorrow", () => {
      advanceTo(today);
      expect(formattedDate("/Date(1581942600000)/")).toEqual("Tomorrow");
      clear();
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
