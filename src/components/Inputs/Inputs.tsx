import React from "react";

import HouseholdSelect from "./HouseholdSelect";
import PostCodeInput from "./PostCodeInput";

import "./Inputs.css";

const Inputs = (): JSX.Element => (
  <section className="inputs">
    <p className="inputs_header">Find your household</p>
    <div className="form-container">
      <PostCodeInput />
      <HouseholdSelect />
    </div>
  </section>
);

export default Inputs;
