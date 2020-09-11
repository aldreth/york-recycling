import React from "react";

import CollectionInfos from "components/CollectionInfo";
import CookieDialog from "components/CookieDialog";
import Footer from "components/Footer";
import Header from "components/Header";
import InfoLinks from "components/InfoLinks";
import Inputs from "components/Inputs";
// import ServiceWorkerWrapper from "components/ServiceWorkerWrapper";

const App = (): JSX.Element => (
  <React.StrictMode>
    {/* <ServiceWorkerWrapper /> */}
    <CookieDialog />
    <div className="grid-container">
      <Header />
      <Inputs />
      <CollectionInfos />
      <InfoLinks />
      <Footer />
    </div>
  </React.StrictMode>
);

export default App;
