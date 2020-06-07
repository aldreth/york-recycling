import { track } from "insights-js";
import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "reducers";
import { setPostcode } from "slices/collectionInfoSlice";
import { postCodeValidator } from "utils";
import "./PostCodeInput.css";

const PostCodeInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const { postcode } = useSelector((state: RootState) => state.collectionInfo);
  const [inputValue, setInputValue] = useState(postcode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length < postcode.length) {
      dispatch(setPostcode({ postcode: newValue }));
    }
    setInputValue(newValue);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPostcode({ postcode: inputValue }));
    track({ id: "setPostCode" });
  };

  return (
    <div className="postcode">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="postcode_input"
          aria-label="Postcode"
          title="Please enter your postcode in the format of YOxy zzz"
          pattern={postCodeValidator}
          required
          placeholder="YO31 1AB"
          defaultValue={postcode}
          onChange={handleChange}
        />
        <button type="submit" className="postcode_submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default PostCodeInput;
