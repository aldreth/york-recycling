import React, { ChangeEvent } from "react";

import "./HouseholdSelect.css";
import { Household, HouseholdsData } from "../../../types";

interface HouseholdSelectProps {
  selectedHousehold: Household;
  householdsData: HouseholdsData;
  onChange: (household: Household | undefined) => void;
}

const HouseholdSelect = ({
  selectedHousehold,
  householdsData,
  onChange
}: HouseholdSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange(
      householdsData.households.find(
        h => h.Uprn && h.Uprn.toString() === e.target.value
      )
    );

  return householdsData.fetched && householdsData.households.length === 0 ? (
    <p className="households">
      No properties found - have you entered your postcode correctly?
    </p>
  ) : (
    <div className="households">
      <select
        defaultValue={selectedHousehold.Uprn}
        onChange={handleChange}
        className="household-select"
        disabled={!householdsData.fetched}
        aria-label="Select household"
      >
        <option value="">Choose...</option>
        {householdsData.households.map((household, idx) => (
          <option value={household.Uprn} key={idx}>
            {household.ShortAddress}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HouseholdSelect;
