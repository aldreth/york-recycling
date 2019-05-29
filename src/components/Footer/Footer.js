import React from "react";

import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div>
      <p>
        Made by <a href="https://aldreth.com">Edward Andrews-Hodgson</a>
      </p>
      <p>
        <a href="https://github.com/aldreth/york-recycling">
          See code and raise bugs
        </a>
      </p>
    </div>
    <div className="thanks">
      Thanks to the City of York for leaving the apis used by their{" "}
      <a href="https://bincollections.azurewebsites.net/">original site</a> open
      for reuse.
    </div>
  </footer>
);

export default Footer;
