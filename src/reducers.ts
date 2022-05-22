import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { recyclingApi } from "api/recyclingApi";
import cookieDialogReducer from "components/CookieDialog/cookieDialogSlice"; // cookieDialogInitialState,
import collectionInfoReducer from "slices/collectionInfoSlice"; // collectionInfoSliceInitialState,
import serviceWorkerReducer from "slices/serviceWorkerSlice"; // serviceWorkerSliceInitialState,
import { AppDispatch } from "store";

export const rootReducer = combineReducers({
  cookieDialog: cookieDialogReducer,
  collectionInfo: collectionInfoReducer,
  serviceWorker: serviceWorkerReducer,
  [recyclingApi.reducerPath]: recyclingApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export const initialRootState: RootState = {
//   cookieDialog: cookieDialogInitialState,
//   collectionInfo: collectionInfoSliceInitialState,
//   serviceWorker: serviceWorkerSliceInitialState,
//   [recyclingApi.reducerPath]: {},
// };

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
