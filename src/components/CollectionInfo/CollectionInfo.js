import React from "react";

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

const CollectionInfo = ({ collectionInfo, idx }) => (
  <div className={`collection${idx + 1}`}>
    <h4>{collectionInfo.WasteTypeDescription}</h4>
    <h5>
      Your next collection will be on{" "}
      {formattedDate(collectionInfo.NextCollection)}
    </h5>
    {/* <dl>
      <dt>Waste Type</dt>
      <dd>{collectionInfo.MaterialsCollected}</dd>
    </dl>
    <dl>
      <dt>Collection Available</dt>
      <dd>{collectionInfo.CollectionAvailable}</dd>
    </dl>
    <dl>
      <dt>Collection Day</dt>
      <dd>{collectionInfo.CollectionDayFull}</dd>
    </dl>
    <dl>
      <dt>Collection Frequency</dt>
      <dd>{collectionInfo.CollectionFrequency}</dd>
    </dl>
    <dl>
      <dt>Where we will collect</dt>
      <dd>{collectionInfo.CollectionPointDescription}</dd>
    </dl>
    <dl>
      <dt>Central collection point (if applicable)</dt>
      <dd>{collectionInfo.CollectionPointLocation}</dd>
    </dl>
    <dl>
      <dt>Bin description</dt>
      <dd>
        {collectionInfo.NumberOfBins} x {collectionInfo.BinTypeDescription}
      </dd>
    </dl> */}
  </div>
);

const CollectionInfos = ({ collectionInfos }) => (
  <div className="collections">
    {collectionInfos.map((c, idx) => (
      <CollectionInfo collectionInfo={c} key={idx} idx={idx} />
    ))}
  </div>
);

export default CollectionInfos;
