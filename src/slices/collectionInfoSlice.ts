import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostcodeState {
  postcode: string;
}
interface PostcodePayload {
  postcode: string;
}

const postcodeInitialState: PostcodeState = { postcode: "" };

export const collectionInfoInitialState: PostcodeState = {
  ...postcodeInitialState
};

const collectionInfoSlice = createSlice({
  name: "collectionInfo",
  initialState: { ...postcodeInitialState },
  reducers: {
    setPostcode(state, action: PayloadAction<PostcodePayload>) {
      state.postcode = action.payload.postcode;
    }
  }
});

export const { setPostcode } = collectionInfoSlice.actions;

export default collectionInfoSlice.reducer;
