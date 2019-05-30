import React, { useState } from "react";

import { postCodeValidator } from "../../../utils";

import "./PostCodeInput.css";

const PostCodeInput = ({ value, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = e => {
    const newValue = e.target.value;
    if (newValue.length < value.length) {
      onSubmit(newValue);
    }
    setInputValue(newValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
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
          defaultValue={value}
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
