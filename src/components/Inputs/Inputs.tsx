import React from "react";

import HouseholdSelect from "./HouseholdSelect";
import PostCodeInput from "./PostCodeInput";

import "./Inputs.css";
import { HouseholdsData, Household } from "../../types";

interface InputsProps {
  postCode: string;
  onSubmitPostCode: () => null;
  householdsData: HouseholdsData;
  household: Household;
  onSelectHousehold: () => null;
}

const Inputs = ({
  postCode,
  onSubmitPostCode,
  householdsData,
  household,
  onSelectHousehold
}: InputsProps) => (
  <section className="inputs">
    <p className="inputs_header">Find your household</p>
    <div className="form-container">
      <PostCodeInput value={postCode} onSubmit={onSubmitPostCode} />
      <HouseholdSelect
        householdsData={householdsData}
        // households={householdsData.households}
        selectedHousehold={household}
        onChange={onSelectHousehold}
      />
    </div>
  </section>
);

export default Inputs;
