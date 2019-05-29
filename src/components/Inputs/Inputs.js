import React from "react";

import HouseholdSelect from "./HouseholdSelect";
import PostCodeInput from "./PostCodeInput";

import "./Inputs.css";

const Inputs = ({
  postCode,
  onSubmitPostCode,
  householdsData,
  household,
  onSelectHousehold
}) => (
  <section className="inputs">
    <p className="inputs_header">Find your household</p>
    <div className="form-container">
      <PostCodeInput value={postCode} onSubmit={onSubmitPostCode} />
      <HouseholdSelect
        householdsData={householdsData}
        households={householdsData.households}
        selectedHousehold={household}
        onChange={onSelectHousehold}
      />
    </div>
  </section>
);

export default Inputs;
