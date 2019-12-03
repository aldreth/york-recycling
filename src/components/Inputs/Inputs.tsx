import React from "react";

import HouseholdSelect from "./HouseholdSelect";
import PostCodeInput from "./PostCodeInput";

import "./Inputs.css";
import { HouseholdsData, Household } from "../../types";

interface InputsProps {
  onSubmitPostCode: () => null;
  household: Household;
  onSelectHousehold: () => null;
}

const Inputs = ({
  onSubmitPostCode,
  household,
  onSelectHousehold
}: InputsProps) => (
  <section className="inputs">
    <p className="inputs_header">Find your household</p>
    <div className="form-container">
      <PostCodeInput onSubmit={onSubmitPostCode} />
      <HouseholdSelect
        selectedHousehold={household}
        onChange={onSelectHousehold}
      />
    </div>
  </section>
);

export default Inputs;
