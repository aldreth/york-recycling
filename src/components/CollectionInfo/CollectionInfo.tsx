import React from "react";
import classnames from "classnames";

import "./card.css";
import { CollectionInfo } from "../../types";

const formattedDate = (string: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const match = string.match(/\/Date\((\d*)\)\//);
  if (!match || match.length < 2) {
    throw new Error("Invalid date format");
  }
  const timestamp = match[1];
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString("en-GB", options);
};

const Card = ({
  children,
  className
}: {
  children: React.ReactChild[];
  className: string;
}) => <div className={classnames("card", className)}>{children}</div>;

const CollectionInfoComponent = ({
  collectionInfo
}: {
  collectionInfo: CollectionInfo;
}) => {
  const classes = classnames({
    "card--gray": collectionInfo.WasteType === "KERBSIDE",
    "card--green": collectionInfo.WasteType === "GREEN",
    "card--black": collectionInfo.WasteType === "GREY BIN/SACK"
  });

  return (
    <div className="collection">
      <Card className={classes}>
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

const CollectionInfos = ({
  collectionInfos
}: {
  collectionInfos: CollectionInfo[];
}) => (
  <div className="collections">
    {collectionInfos.map(c => (
      <CollectionInfoComponent collectionInfo={c} key={c.timestamp} />
    ))}
  </div>
);

export default CollectionInfos;
