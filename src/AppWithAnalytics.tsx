import React from "react";
import { init, track, trackPages, parameters } from "insights-js";

import App from "./App";

const AppWithAnalytics = () => {
  init(process.env.REACT_APP_GET_INSIGHTS_KEY!);
  track({
    id: "initial-render",
    parameters: {
      locale: parameters.locale(),
      screenType: parameters.screenType(),
      referrer: parameters.referrer()
    }
  });
  trackPages();
  return <App />;
};

export default AppWithAnalytics;
