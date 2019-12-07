import { combineReducers } from "redux";

import cookieDialogReducer, {
  cookieDialogInitialState
} from "./components/CookieDialog/cookieDialogSlice";
import collectionInfoReducer, {
  collectionInfoSliceInitialState
} from "./slices/collectionInfoSlice";

export const rootReducer = combineReducers({
  cookieDialog: cookieDialogReducer,
  collectionInfo: collectionInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const initialRootState: RootState = {
  cookieDialog: cookieDialogInitialState,
  collectionInfo: collectionInfoSliceInitialState
};
