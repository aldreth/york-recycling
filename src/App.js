import React, { useState, useEffect } from "react";
import { track } from "insights-js";
import { useSelector, useDispatch } from "react-redux";

import {
  householdsUrl,
  collectionsUrl,
  defaultHousehold,
  defaultCollectionInfoData,
  postCodeValidator
  // collectionInfoDataOutOfDate
} from "./utils";

import { setHouseholdData } from "./slices/collectionInfoSlice";
import CookieDialog from "./components/CookieDialog";
import CollectionInfos from "./components/CollectionInfo";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Footer from "./components/Footer";

import { sortedCollections } from "./utils";

const App = () => {
  // State hooks
  const dispatch = useDispatch();
  const { postcode } = useSelector(state => state.collectionInfo);
  const [household, setHousehold] = useState(defaultHousehold());
  const { householdData: householdsData } = useSelector(
    state => state.collectionInfo
  );
  const [collectionInfoData, setCollectionInfoData] = useState(
    defaultCollectionInfoData()
  );

  // Calculated from state
  // const refreshCollections = collectionInfoDataOutOfDate(collectionInfoData);

  // Effect hooks
  // Fetch households using postcode
  useEffect(() => {
    if (
      !postcode ||
      !postcode.match(postCodeValidator) ||
      householdsData.fetched
    ) {
      return;
    }

    async function fetchData() {
      const result = await fetch(householdsUrl(postcode));
      const households = await result.json();
      dispatch(setHouseholdData({ households }));
      track({ id: "householdsData-fetched" });
    }
    fetchData();
  }, [postcode, householdsData, dispatch]);

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
      track({ id: "collectionInfoData-fetched" });
    }
    fetchData();
  }, [household.Uprn]);

  // Store data in local storage
  useEffect(() => {
    window.localStorage.setItem("household", JSON.stringify(household));
    window.localStorage.setItem(
      "collectionInfoData",
      JSON.stringify(collectionInfoData)
    );
  }, [household, householdsData, collectionInfoData]);

  // Component callbacks
  const onSubmitPostCode = () => {
    setHousehold({});
    setCollectionInfoData({
      fetched: false,
      collectionInfo: []
    });
    track({ id: "setPostCode" });
  };

  const onSelectHousehold = household => setHousehold(household);

  return (
    <React.StrictMode>
      <CookieDialog />
      <div className="grid-container">
        <Header />
        <Inputs
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
