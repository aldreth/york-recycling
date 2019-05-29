import React, { useState } from "react";

import "./PostCodeInput.css";

const PostCodeInput = ({ value, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = e => setInputValue(e.target.value);
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
          pattern="[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}"
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
