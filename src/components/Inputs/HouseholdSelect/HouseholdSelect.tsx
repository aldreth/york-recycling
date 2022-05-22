// import { track } from "insights-js";
import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useGetAddressesByPostCodeQuery } from "api/recyclingApi";
import { RootState } from "reducers";
import { setHousehold } from "slices/collectionInfoSlice";
import "./HouseholdSelect.css";
import { postCodeValidatorRegEx, noneFound, isRTKQueryReady } from "utils";

const HouseholdSelect = (): JSX.Element => {
  const dispatch = useDispatch();
  const { household: selectedHousehold, normalizedPostcode } = useSelector(
    (state: RootState) => state.collectionInfo
  );

  // Fetch households using postcode
  // useEffect(() => {
  //   dispatch(fetchHouseholdData(postcode));
  //   track({ id: "householdsData-fetched" });
  // }, [postcode, dispatch]);

  const { data, isLoading, error, isUninitialized, isFetching } =
    useGetAddressesByPostCodeQuery(normalizedPostcode, {
      skip: !postCodeValidatorRegEx.exec(normalizedPostcode),
    });

  const isReady = isRTKQueryReady(isLoading, isUninitialized, isFetching);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedHousehold = data?.find(
      (h) => h.uprn && h.uprn.toString() === e.target.value
    );
    if (selectedHousehold) {
      dispatch(setHousehold({ household: selectedHousehold }));
    }
  };

  if (error) {
    let message = "";
    if ("status" in error) {
      message = `status: ${error.status}`;
    } else {
      message = error.message ?? "";
    }
    return <div>Something's gone wrong: {message}</div>;
  }

  if (noneFound(isReady, data)) {
    return (
      <p className="households">
        No properties found - have you entered your postcode correctly?
      </p>
    );
  }

  return (
    <div className="households">
      {
        // eslint-disable-next-line
      }<select
        value={selectedHousehold.uprn}
        onChange={handleChange}
        className="household-select"
        disabled={!isReady}
        aria-label="Select household"
      >
        <option value="">Choose...</option>
        {data?.map((household, idx) => (
          <option value={household.uprn} key={idx}>
            {household.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HouseholdSelect;
