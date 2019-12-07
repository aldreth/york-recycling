import { householdsUrl, collectionsUrl } from "./utils";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCode = "YO24 1DD";
const household = { some: "info" };

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
