import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@reach/dialog";
import { useId } from "@reach/auto-id";

import { setViewed, toggleOpen } from "./cookieDialogSlice";
import "@reach/dialog/styles.css";
import "./CookieDialog.css";
import { RootState } from "../../reducers";

const CookieDialog = () => {
  const { viewed, open } = useSelector(
    (state: RootState) => state.cookieDialog
  );
  const dispatch = useDispatch();

  const labelId = `label:${useId()}`;

  const dispatchSetViewed = () => {
    dispatch(setViewed());
  };

  const dispatchToggleOpen = () => {
    dispatch(toggleOpen());
  };

  return (
    <>
      {!viewed && (
        <div className="cookie-info">
          <button className="link" onClick={dispatchToggleOpen}>
            Find out about cookies
          </button>
          <button onClick={dispatchSetViewed}>X</button>
        </div>
      )}
      <Dialog
        aria-labelledby={labelId}
        isOpen={open}
        onDismiss={dispatchToggleOpen}
        className="cookie-dialog"
      >
        <h4 className="dialog__header">Cookies</h4>
        <p className="dialog__content">
          This app uses local storage to store information about your postcode
          and address. This information remains on your computer and is not
          accessible to anyone other than you.
        </p>
        <p className="dialog__content">
          Page views and analytics are recorded using a privacy respecting{" "}
          <a href="https://getinsights.io/">service</a>. No cookies are used and
          no personal information is recorded. See their{" "}
          <a href="https://getinsights.io/privacy">privacy policy</a>.
        </p>
        <button className="dialog__button" onClick={dispatchToggleOpen}>
          Okay
        </button>
      </Dialog>
    </>
  );
};

export default CookieDialog;
