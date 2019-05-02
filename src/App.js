import React, { useState, useEffect } from "react";

import CollectionInfos from "./components/CollectionInfo";
import HouseholdSelect from "./components/HouseholdSelect";
import PostCodeInput from "./components/PostCodeInput";

const baseUrl = "https://doitonline.york.gov.uk/BinsApi/EXOR";
const householdsUrl = postCode =>
  `${baseUrl}/getPropertiesForPostCode?postcode=${postCode}`;
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
      return {
        ...e,
        timestamp: parseInt(e.NextCollection.match(/\/Date\((\d*)\)\//)[1])
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  const firstCollection = sortedCollections[0];
  return firstCollection.timestamp > Date.now() ? "no" : "yes";
};

const App = () => {
  const [postCode, setPostCode] = useState(defaultPostCode());
  const [household, setHousehold] = useState(defaultHousehold());
  const [householdsData, setHouseholdsData] = useState(defaultHouseholdsData());
  const [collectionInfoData, setCollectionInfoData] = useState(
    defaultCollectionInfoData()
  );
  const refreshCollections = collectionInfoDataOutOfDate(collectionInfoData);
  const onSubmitPostCode = postCode => {
    setPostCode(postCode);
    setHouseholdsData({
      fetched: false,
      households: []
    });
    setHousehold({});
    setCollectionInfoData({
      fetched: false,
      collectionInfo: []
    });
  };
  const onSelectHousehold = household => setHousehold(household);

  useEffect(() => {
    if (!postCode || householdsData.fetched) {
      return;
    }

    async function fetchData() {
      const result = await fetch(householdsUrl(postCode.replace(/\s+/g, "")));
      const households = await result.json();
      setHouseholdsData({ fetched: true, households });
    }
    fetchData();
  }, [postCode, householdsData]);

  useEffect(() => {
    if (!household.Uprn || collectionInfoData.fetched) {
      return;
    }
    async function fetchData() {
      const result = await fetch(collectionsUrl(household.Uprn));
      const collectionInfo = await result.json();
      setCollectionInfoData({ fetched: true, collectionInfo });
    }
    fetchData();
  }, [collectionInfoData, household, refreshCollections]);

  useEffect(() => {
    window.localStorage.setItem("postCode", postCode);
    window.localStorage.setItem("household", JSON.stringify(household));
    window.localStorage.setItem(
      "householdsData",
      JSON.stringify(householdsData)
    );
    window.localStorage.setItem(
      "collectionInfoData",
      JSON.stringify(collectionInfoData)
    );
  }, [postCode, household, householdsData, collectionInfoData]);

  return (
    <div className="App">
      <h1>Refuse & Recycling Collection Lookup - City of York</h1>
      <PostCodeInput value={postCode} onSubmit={onSubmitPostCode} />
      <HouseholdSelect
        householdsData={householdsData}
        households={householdsData.households}
        selectedHousehold={household}
        onChange={onSelectHousehold}
      />
      <CollectionInfos collectionInfos={collectionInfoData.collectionInfo} />
    </div>
  );
};

export default App;
