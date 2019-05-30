import {
  householdsUrl,
  collectionsUrl,
  defaultPostCode,
  defaultHousehold,
  defaultHouseholdsData,
  defaultCollectionInfoData,
  collectionInfoDataOutOfDate
} from "./utils";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const postCode = "YO24 1DD";
const household = { some: "info" };
const householdsData = {
  fetched: true,
  households: [household]
};
const collectionInfoData = {
  fetched: true,
  collectionInfo: [{ collection: "info" }]
};
const oneDayInSeconds = 24 * 60 * 60 * 1000;

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

  describe("defaultPostCode", () => {
    it("with nothing stored to local storage is an empty string", () => {
      expect(defaultPostCode()).toEqual("");
    });

    it("can be set from local storage", () => {
      window.localStorage.setItem("postCode", postCode);
      expect(defaultPostCode()).toEqual(postCode);
    });
  });

  describe("defaultHousehold", () => {
    it("with nothing stored to local storage is an empty object", () => {
      expect(defaultHousehold()).toEqual({});
    });

    it("can be set from local storage", () => {
      window.localStorage.setItem("household", JSON.stringify(household));
      expect(defaultHousehold()).toEqual(household);
    });
  });

  describe("defaultHouseholdsData", () => {
    it("with nothing stored to local storage is the default householdsData object", () => {
      expect(defaultHouseholdsData()).toEqual({
        fetched: false,
        households: []
      });
    });

    it("can be set from local storage", () => {
      window.localStorage.setItem(
        "householdsData",
        JSON.stringify(householdsData)
      );
      expect(defaultHouseholdsData()).toEqual(householdsData);
    });
  });

  describe("defaultCollectionInfoData", () => {
    it("with nothing stored to local storage is the default householdsData object", () => {
      expect(defaultCollectionInfoData()).toEqual({
        fetched: false,
        collectionInfo: []
      });
    });

    it("can be set from local storage", () => {
      window.localStorage.setItem(
        "collectionInfoData",
        JSON.stringify(collectionInfoData)
      );
      expect(defaultCollectionInfoData()).toEqual(collectionInfoData);
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
