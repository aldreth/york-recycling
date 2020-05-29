import React from "react";

import CookieDialog from "components/CookieDialog";
import CollectionInfos from "components/CollectionInfo";
import Header from "components/Header";
import Inputs from "components/Inputs";
import Footer from "components/Footer";
import InfoLinks from "components/InfoLinks";
import ServiceWorkerWrapper from "components/ServiceWorkerWrapper";

const App = () => (
  <React.StrictMode>
    <ServiceWorkerWrapper />
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
