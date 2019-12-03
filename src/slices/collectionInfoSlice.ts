import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Household } from "../types";

interface PostcodeState {
  postcode: string;
}
interface PostcodePayload {
  postcode: string;
}

interface HouseholdPayload {
  households: Household[];
}
interface HouseholdsDataState {
  householdData: {
    fetched: boolean;
    households: Household[];
  };
}

type CollectionInfoState = PostcodeState & HouseholdsDataState;

const postcodeInitialState: PostcodeState = { postcode: "" };
const householdsDataInitialState: HouseholdsDataState = {
  householdData: {
    fetched: false,
    households: []
  }
};

export const collectionInfoInitialState: CollectionInfoState = {
  ...postcodeInitialState,
  ...householdsDataInitialState
};

const collectionInfoSlice = createSlice({
  name: "collectionInfo",
  initialState: { ...collectionInfoInitialState },
  reducers: {
    setPostcode(state, action: PayloadAction<PostcodePayload>) {
      const { postcode } = action.payload;
      state.postcode = postcode;
      state.householdData = householdsDataInitialState.householdData;
    },
    setHouseholdData(state, action: PayloadAction<HouseholdPayload>) {
      const { households } = action.payload;
      state.householdData.fetched = true;
      state.householdData.households = households;
    }
  }
});

export const { setPostcode, setHouseholdData } = collectionInfoSlice.actions;

export default collectionInfoSlice.reducer;
