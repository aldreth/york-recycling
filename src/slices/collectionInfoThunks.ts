import { createAsyncThunk } from "@reduxjs/toolkit";

import { parseCollectionDtos } from "utils";

const fetchCollectionsInfo = createAsyncThunk(
  "collectionInfo/fetchCollectionsInfo",
  async (uprn: string) => {
    const body = JSON.stringify({ uprn });
    const result = await fetch(".netlify/functions/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const collectionInfos: NewCollectionInfoDto[] =
      (await result.json()) as NewCollectionInfoDto[];
    //eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return parseCollectionDtos(collectionInfos);
  }
);

export { fetchCollectionsInfo };
