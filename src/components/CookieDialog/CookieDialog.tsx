// import { Dialog } from "@reach/dialog";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "reducers";

import { toggleOpen } from "./cookieDialogSlice";

// const CookieDialog = (): JSX.Element => {
//   const { open } = useSelector((state: RootState) => state.cookieDialog);
//   const dispatch = useDispatch();

//   const dispatchToggleOpen = () => {
//     dispatch(toggleOpen());
//   };

//   return (
//     <div
//       isOpen={open}
//       onDismiss={dispatchToggleOpen}
//       className="cookie-dialog"
//       aria-label="Cookie information"
//     >
//       <h4 className="dialog__header">Cookies</h4>
//       <p className="dialog__content">
//         This app uses local storage to store information about your postcode and
//         address. This information remains on your computer and is not accessible
//         to anyone other than you.
//       </p>
//       <p className="dialog__content">No cookies are used.</p>
//       <button
//         className="dialog__button"
//         onClick={dispatchToggleOpen}
//         // eslint-disable-next-line jsx-a11y/no-autofocus
//         autoFocus
//       >
//         Okay
//       </button>
//     </div>
//   );
// };

const CookieDialog = (): JSX.Element => {
  return <div>No cookies are used</div>;
};

export default CookieDialog;
