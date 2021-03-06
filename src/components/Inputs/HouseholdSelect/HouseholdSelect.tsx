import { track } from "insights-js";
import React, { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "reducers";
import { setHousehold } from "slices/collectionInfoSlice";
import { fetchHouseholdData } from "slices/collectionInfoThunks";

import "./HouseholdSelect.css";

const HouseholdSelect = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    household: selectedHousehold,
    householdData: householdsData,
    postcode,
  } = useSelector((state: RootState) => state.collectionInfo);

  // Fetch households using postcode
  useEffect(() => {
    dispatch(fetchHouseholdData(postcode));
    track({ id: "householdsData-fetched" });
  }, [postcode, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedHousehold = householdsData.households.find(
      (h) => h.Uprn && h.Uprn.toString() === e.target.value
    );
    if (selectedHousehold) {
      dispatch(setHousehold({ household: selectedHousehold }));
    }
  };

  return householdsData.fetched && householdsData.households.length === 0 ? (
    <p className="households">
      No properties found - have you entered your postcode correctly?
    </p>
  ) : (
    <div className="households">
      {
        // eslint-disable-next-line
      }<select
        value={selectedHousehold.Uprn}
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
