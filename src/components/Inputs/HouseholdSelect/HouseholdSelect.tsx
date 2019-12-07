import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setHousehold } from "../../../slices/collectionInfoSlice";
import { RootState } from "../../../reducers";

import "./HouseholdSelect.css";

const HouseholdSelect = () => {
  const dispatch = useDispatch();
  const { household: selectedHousehold } = useSelector(
    (state: RootState) => state.collectionInfo
  );
  const { householdData: householdsData } = useSelector(
    (state: RootState) => state.collectionInfo
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedHousehold = householdsData.households.find(
      h => h.Uprn && h.Uprn.toString() === e.target.value
    );
    dispatch(setHousehold({ household: selectedHousehold! }));
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
