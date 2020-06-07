import React from "react";
import { useDispatch } from "react-redux";

import { toggleOpen } from "components/CookieDialog/cookieDialogSlice";

import "./Footer.css";

const Footer = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <footer className="footer">
      <div>
        <p>
          <button className="link" onClick={() => dispatch(toggleOpen())}>
            Find out about cookies
          </button>
        </p>
        <p>
          Made by <a href="https://aldreth.com">Edward Andrews-Hodgson</a>{" "}
          <a
            className="mr-lg-2"
            href="https://github.com/aldreth/york-recycling"
          >
            See code and raise bugs
          </a>
        </p>
      </div>
      <div className="thanks">
        Thanks to the City of York for leaving the apis used by their{" "}
        <a href="https://bincollections.azurewebsites.net/">original site</a>{" "}
        open for reuse.
      </div>
    </footer>
  );
};

export default Footer;
