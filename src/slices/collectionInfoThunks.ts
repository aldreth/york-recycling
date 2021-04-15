import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "reducers";
import { postCodeValidatorRegEx, parseCollectionDtos } from "utils";

const fetchHouseholdData = createAsyncThunk(
  "collectionInfo/fetchHouseholdData",
  async (postcode: string, thunkApi): Promise<NewHousehold[] | undefined> => {
    const state = thunkApi.getState() as RootState;
    const fetched = state.collectionInfo.householdData.fetched;

    if (!postcode || !postCodeValidatorRegEx.exec(postcode) || fetched) {
      return;
    }

    const body = JSON.stringify({ postcode: postcode });
    const result = await fetch(".netlify/functions/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const households: NewHousehold[] = (await result.json()) as NewHousehold[];
    //eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return households;
  }
);

const fetchCollectionsInfo = createAsyncThunk(
  "collectionInfo/fetchCollectionsInfo",
  async (uprn: string) => {
    const body = JSON.stringify({ uprn });
    console.log("**************", body);
    const result = await fetch(".netlify/functions/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const collectionInfos: NewCollectionInfoDto[] = (await result.json()) as NewCollectionInfoDto[];
    //eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return parseCollectionDtos(collectionInfos);
  }
);

export { fetchHouseholdData, fetchCollectionsInfo };
