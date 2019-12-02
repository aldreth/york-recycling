import { combineReducers } from "redux";

import cookieDialogReducer, {
  cookieDialogInitialState
} from "./components/CookieDialog/cookieDialogSlice";

export const rootReducer = combineReducers({
  cookieDialog: cookieDialogReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const initialRootState: RootState = {
  cookieDialog: cookieDialogInitialState
};
