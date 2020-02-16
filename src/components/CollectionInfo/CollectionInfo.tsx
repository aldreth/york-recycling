import React, { useEffect } from "react";
import classnames from "classnames";

import "./card.css";
import { CollectionInfo } from "types";
import { RootState } from "reducers";
import { useSelector, useDispatch } from "react-redux";
import { track } from "insights-js";
import { fetchCollectionsInfo } from "slices/collectionInfoSlice";
import { formattedDate } from "utils";

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

const CollectionInfos = () => {
  const {
    collectionInfoData,
    household: { Uprn }
  } = useSelector((state: RootState) => state.collectionInfo);

  const dispatch = useDispatch();

  // Fetch collection information using household uprn
  useEffect(() => {
    if (!Uprn) {
      return;
    }

    dispatch(fetchCollectionsInfo(Uprn));
    track({ id: "collectionInfoData-fetched" });
  }, [dispatch, Uprn]);

  return (
    <div className="collections">
      {collectionInfoData.collectionInfo.map(c => (
        <CollectionInfoComponent collectionInfo={c} key={c.timestamp} />
      ))}
    </div>
  );
};

export default CollectionInfos;
