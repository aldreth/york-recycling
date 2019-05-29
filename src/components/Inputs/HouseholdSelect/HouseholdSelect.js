import React from "react";

import "./HouseholdSelect.css";

const HouseholdSelect = ({ selectedHousehold, householdsData, onChange }) => {
  const handleChange = e => {
    return onChange(
      householdsData.households.find(h => h.Uprn.toString() === e.target.value)
    );
  };

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
