import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import cookieDialogReducer, {
  cookieDialogInitialState,
} from "components/CookieDialog/cookieDialogSlice";
import collectionInfoReducer, {
  collectionInfoSliceInitialState,
} from "slices/collectionInfoSlice";
import serviceWorkerReducer, {
  serviceWorkerSliceInitialState,
} from "slices/serviceWorkerSlice";

export const rootReducer = combineReducers({
  cookieDialog: cookieDialogReducer,
  collectionInfo: collectionInfoReducer,
  serviceWorker: serviceWorkerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const initialRootState: RootState = {
  cookieDialog: cookieDialogInitialState,
  collectionInfo: collectionInfoSliceInitialState,
  serviceWorker: serviceWorkerSliceInitialState,
};

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
