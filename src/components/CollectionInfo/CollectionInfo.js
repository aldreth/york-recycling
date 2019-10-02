import React from "react";
import classnames from "classnames";

import "./card.css";

const formattedDate = string => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const timestamp = string.match(/\/Date\((\d*)\)\//)[1];
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString("en-GB", options);
};

const Card = ({ children, className }) => (
  <div className={classnames("card", className)}>{children}</div>
);

const CollectionInfo = ({ collectionInfo }) => {
  const classnames = {
    "card--gray": collectionInfo.WasteType === "KERBSIDE",
    "card--green": collectionInfo.WasteType === "GREEN",
    "card--black": collectionInfo.WasteType === "GREY BIN/SACK"
  };

  return (
    <div className="collection">
      <Card className={classnames}>
        <div className="card_title">
          <h4>{collectionInfo.WasteTypeDescription}</h4>
          <h5>
            Next collection: {formattedDate(collectionInfo.NextCollection)}
          </h5>
        </div>
        <div className="card_body">
          <ul>
            <li>
              <span className="strong">Collection day:</span>{" "}
              <span>{collectionInfo.CollectionDayFull}</span>
            </li>
            <li>
              <span className="strong">Collection frequency:</span>{" "}
              <span>{collectionInfo.CollectionFrequency}</span>
            </li>
            <li>
              <span className="strong">Where we will collect:</span>{" "}
              <span>
                {collectionInfo.CollectionPointLocation ||
                  collectionInfo.CollectionPointDescription}
              </span>
            </li>
            {/*
            {collectionInfo.CollectionPointLocation && (
              <li>
                <span className="strong">Central collection point:</span>{" "}
                <span>{collectionInfo.CollectionPointLocation}</span>
              </li>
            )} */}
            <li>
              <span className="strong">Bin description:</span>{" "}
              <span>
                {collectionInfo.NumberOfBins} x{" "}
                {collectionInfo.BinTypeDescription}
              </span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

const CollectionInfos = ({ collectionInfos }) => (
  <div className="collections">
    {collectionInfos.map((c, idx) => (
      <CollectionInfo collectionInfo={c} key={idx} idx={idx} />
    ))}
  </div>
);

export default CollectionInfos;
