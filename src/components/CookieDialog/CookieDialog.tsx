import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@reach/dialog";

import { toggleOpen } from "./cookieDialogSlice";
import { RootState } from "reducers";

const CookieDialog = () => {
  const { open } = useSelector((state: RootState) => state.cookieDialog);
  const dispatch = useDispatch();

  const dispatchToggleOpen = () => {
    dispatch(toggleOpen());
  };

  return (
    <Dialog
      isOpen={open}
      onDismiss={dispatchToggleOpen}
      className="cookie-dialog"
      aria-label="Cookie information"
    >
      <h4 className="dialog__header">Cookies</h4>
      <p className="dialog__content">
        This app uses local storage to store information about your postcode and
        address. This information remains on your computer and is not accessible
        to anyone other than you.
      </p>
      <p className="dialog__content">No cookies are used.</p>
      <button className="dialog__button" onClick={dispatchToggleOpen} autoFocus>
        Okay
      </button>
    </Dialog>
  );
};

export default CookieDialog;
