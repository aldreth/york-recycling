import { combineReducers } from "redux";

import cookieDialogoReducer from "./components/CookieDialog/cookieDialogSlice";

export default combineReducers({
  cookieDialog: cookieDialogoReducer
});
