import React from "react";

const HouseholdSelect = ({ selectedHousehold, householdsData, onChange }) => {
  const handleChange = e => {
    return onChange(
      householdsData.households.find(h => h.Uprn.toString() === e.target.value)
    );
  };

  if (!householdsData.fetched) {
    return null;
  }

  return householdsData.fetched && householdsData.households.length === 0 ? (
    <p>No properties found - have you entered your postcode correctly?</p>
  ) : (
    <select defaultValue={selectedHousehold.Uprn} onChange={handleChange}>
      <option value="">Choose...</option>
      {householdsData.households.map((household, idx) => (
        <option value={household.Uprn} key={idx}>
          {household.ShortAddress}
        </option>
      ))}
    </select>
  );
};

export default HouseholdSelect;
