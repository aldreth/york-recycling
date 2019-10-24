import React, { useState, useEffect } from "react";

import {
  householdsUrl,
  collectionsUrl,
  defaultPostCode,
  defaultHousehold,
  defaultHouseholdsData,
  defaultCollectionInfoData,
  postCodeValidator
  // collectionInfoDataOutOfDate
} from "./utils";

import CollectionInfos from "./components/CollectionInfo";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Footer from "./components/Footer";

import { sortedCollections } from "./utils";

const App = () => {
  // State hooks
  const [postCode, setPostCode] = useState(defaultPostCode());
  const [household, setHousehold] = useState(defaultHousehold());
  const [householdsData, setHouseholdsData] = useState(defaultHouseholdsData());
  const [collectionInfoData, setCollectionInfoData] = useState(
    defaultCollectionInfoData()
  );

  // Calculated from state
  // const refreshCollections = collectionInfoDataOutOfDate(collectionInfoData);

  // Effect hooks
  // Fetch households using postcode
  useEffect(() => {
    if (
      !postCode ||
      !postCode.match(postCodeValidator) ||
      householdsData.fetched
    ) {
      return;
    }

    async function fetchData() {
      const result = await fetch(householdsUrl(postCode));
      const households = await result.json();
      setHouseholdsData({ fetched: true, households });
    }
    fetchData();
  }, [postCode, householdsData]);

  // Fetch collection information using household uprn
  useEffect(() => {
    if (!household.Uprn) {
      return;
    }
    async function fetchData() {
      const result = await fetch(collectionsUrl(household.Uprn));
      const collectionInfo = await result.json();
      setCollectionInfoData({
        fetched: true,
        collectionInfo: sortedCollections(collectionInfo)
      });
    }
    fetchData();
  }, [household.Uprn]);

  // Store data in local storage
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

  // Component callbacks
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

  return (
    <React.StrictMode>
      <div className="grid-container">
        <Header />
        <Inputs
          postCode={postCode}
          onSubmitPostCode={onSubmitPostCode}
          householdsData={householdsData}
          household={household}
          onSelectHousehold={onSelectHousehold}
        />
        <CollectionInfos collectionInfos={collectionInfoData.collectionInfo} />
        <Footer />
      </div>
    </React.StrictMode>
  );
};

export default App;
