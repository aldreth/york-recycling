import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { mergeCollectionInfos } from "utils";

import { fetchCollectionsInfo } from "./collectionInfoThunks";

interface PostcodeState {
  postcode: string;
  normalizedPostcode: string;
}
interface PostcodePayload {
  postcode: string;
}

interface HouseholdPayload {
  household: NewHousehold;
}

interface HouseholdsDataState {
  householdData: {
    fetched: boolean;
    households: NewHousehold[];
  };
}
interface HouseholdState {
  household: NewHousehold;
}
interface CollectionInfoDataState {
  collectionInfoData: {
    fetched: boolean;
    collectionInfo: CollectionInfo[];
  };
}

type CollectionInfoSliceState = PostcodeState &
  HouseholdsDataState &
  HouseholdState &
  CollectionInfoDataState;

const postcodeInitialState: PostcodeState = {
  postcode: "",
  normalizedPostcode: "",
};
const householdInitialState: NewHousehold = {
  uprn: "",
  address: "",
};
const householdsDataInitialState: HouseholdsDataState = {
  householdData: {
    fetched: false,
    households: [],
  },
};

const collectionInfoDataInitialState: CollectionInfoDataState = {
  collectionInfoData: {
    fetched: false,
    collectionInfo: [],
  },
};

export const collectionInfoSliceInitialState: CollectionInfoSliceState = {
  ...postcodeInitialState,
  ...householdsDataInitialState,
  household: householdInitialState,
  ...collectionInfoDataInitialState,
};

const collectionInfoSlice = createSlice({
  name: "collectionInfo",
  initialState: collectionInfoSliceInitialState,
  reducers: {
    setPostcode(state, action: PayloadAction<PostcodePayload>) {
      const { postcode } = action.payload;
      state.postcode = postcode;
      state.normalizedPostcode = postcode
        .toLocaleUpperCase()
        .replace(/\s/g, "");
      state.household = householdInitialState;
      state.householdData = householdsDataInitialState.householdData;
      state.collectionInfoData =
        collectionInfoDataInitialState.collectionInfoData;
    },
    setHousehold(state, action: PayloadAction<HouseholdPayload>) {
      const { household } = action.payload;
      state.household = household;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollectionsInfo.pending, (state) => {
      state.collectionInfoData.fetched = false;
    });
    builder.addCase(fetchCollectionsInfo.fulfilled, (state, { payload }) => {
      state.collectionInfoData.fetched = true;
      const updatedCollectionInfo = mergeCollectionInfos(
        state.collectionInfoData.collectionInfo,
        payload
      );
      state.collectionInfoData.collectionInfo = updatedCollectionInfo;
    });
    builder.addCase(fetchCollectionsInfo.rejected, (state) => {
      state.collectionInfoData.fetched = true;
      // TODO: Add error handling
    });
  },
});

export const { setPostcode, setHousehold } = collectionInfoSlice.actions;

export default collectionInfoSlice.reducer;
