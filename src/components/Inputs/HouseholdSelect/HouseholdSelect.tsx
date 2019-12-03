import React, { ChangeEvent } from "react";

import "./HouseholdSelect.css";
import { Household } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

interface HouseholdSelectProps {
  selectedHousehold: Household;
  onChange: (household: Household | undefined) => void;
}

const HouseholdSelect = ({
  selectedHousehold,
  onChange
}: HouseholdSelectProps) => {
  const { householdData: householdsData } = useSelector(
    (state: RootState) => state.collectionInfo
  );

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
