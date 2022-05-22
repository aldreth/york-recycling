import classnames from "classnames";
import { track } from "insights-js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "reducers";
import { fetchCollectionsInfo } from "slices/collectionInfoThunks";
import { formattedDate } from "utils";

import "./card.css";

const Card = ({
  children,
  className,
}: {
  children: React.ReactChild[];
  className: string;
}) => <div className={classnames("card", className)}>{children}</div>;

const CollectionInfoComponent = ({
  collectionInfo,
}: {
  collectionInfo: CollectionInfo;
}) => {
  const classes = classnames({
    "card--gray": collectionInfo.service === "RECYCLING",
    "card--green": collectionInfo.service === "GARDEN",
    "card--black": collectionInfo.service === "REFUSE",
  });

  return (
    <div className="collection">
      <Card className={classes}>
        <div className="card_title">
          <div className="left">{collectionInfo.icon}</div>
          <div className="right">
            <h4>{collectionInfo.title}</h4>
            <h5>Next collection: {formattedDate(collectionInfo.timestamp)}</h5>
          </div>
        </div>
        <div className="card_body">
          <ul>
            <li>
              <span className="strong">Waste type:</span>{" "}
              <span>{collectionInfo.wasteType}</span>
            </li>
            <li>
              <span className="strong">Collection:</span>{" "}
              <span>{collectionInfo.collectionDay}</span>
            </li>
            <li>
              <span className="strong">Bin description:</span>{" "}
              <span>{collectionInfo.binDescription}</span>
            </li>
            {collectionInfo.collectionPoint.length > 0 && (
              <li>
                <span className="strong">Waste collected from:</span>{" "}
                <span>{collectionInfo.collectionPoint}</span>
              </li>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
};

const CollectionInfos = (): JSX.Element => {
  const {
    collectionInfoData,
    household: { uprn },
  } = useSelector((state: RootState) => state.collectionInfo);

  const dispatch = useAppDispatch();

  // Fetch collection information using household uprn
  useEffect(() => {
    if (!uprn) {
      return;
    }

    void dispatch(fetchCollectionsInfo(uprn));
    track({ id: "collectionInfoData-fetched" });
  }, [dispatch, uprn]);

  return (
    <div className="collections">
      {collectionInfoData.collectionInfo.map((c) => (
        <CollectionInfoComponent collectionInfo={c} key={c.key} />
      ))}
    </div>
  );
};

export default CollectionInfos;
