import React, { useEffect } from "react";
import { track } from "insights-js";
import { useSelector, useDispatch } from "react-redux";

import { householdsUrl, collectionsUrl, postCodeValidator } from "./utils";

import {
  setHouseholdData,
  setCollectionInfoData
} from "./slices/collectionInfoSlice";
import CookieDialog from "./components/CookieDialog";
import CollectionInfos from "./components/CollectionInfo";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Footer from "./components/Footer";

import { sortedCollections } from "./utils";

const App = () => {
  const dispatch = useDispatch();
  const { postcode, household, householdData: householdsData } = useSelector(
    state => state.collectionInfo
  );

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
      const collectionInfos = await result.json();
      dispatch(
        setCollectionInfoData({
          collectionInfos: sortedCollections(collectionInfos)
        })
      );
      track({ id: "collectionInfoData-fetched" });
    }
    fetchData();
  }, [dispatch, household.Uprn]);

  return (
    <React.StrictMode>
      <CookieDialog />
      <div className="grid-container">
        <Header />
        <Inputs />
        <CollectionInfos />
        <Footer />
      </div>
    </React.StrictMode>
  );
};

export default App;
