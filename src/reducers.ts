import { combineReducers } from "redux";

import cookieDialogReducer from "./components/CookieDialog/cookieDialogSlice";

export const rootReducer = combineReducers({
  cookieDialog: cookieDialogReducer
});

export type RootState = ReturnType<typeof rootReducer>;
