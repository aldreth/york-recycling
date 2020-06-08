import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "reducers";
import {
  postCodeValidatorRegEx,
  householdsUrl,
  collectionsUrl,
  sortedCollections,
} from "utils";

const fetchHouseholdData = createAsyncThunk(
  "collectionInfo/fetchHouseholdData",
  async (postcode: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const fetched = state.collectionInfo.householdData.fetched;

    if (!postcode || !postCodeValidatorRegEx.exec(postcode) || fetched) {
      return;
    }
    const result = await fetch(householdsUrl(postcode));
    const households = (await result.json()) as Household[];
    return households;
  }
);

const fetchCollectionsInfo = createAsyncThunk(
  "collectionInfo/fetchCollectionsInfo",
  async (householdUprn: string) => {
    const result = await fetch(collectionsUrl(householdUprn));
    const collectionInfos = (await result.json()) as CollectionInfoDto[];
    return sortedCollections(collectionInfos);
  }
);

export { fetchHouseholdData, fetchCollectionsInfo };
