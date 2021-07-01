import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recyclingApi = createApi({
  reducerPath: "recyclingApi",
  baseQuery: fetchBaseQuery({ baseUrl: ".netlify/functions/" }),
  // tagTypes: ["Address", "Addresses"],
  endpoints: (builder) => ({
    getAddressesByPostCode: builder.query<NewHousehold[], string>({
      query: (postcode) => ({
        url: `addresses`,
        method: "POST",
        body: { postcode },
      }),
      keepUnusedDataFor: 86_400, // 1 day
      // providesTags: (result, error, postcode) =>
      //   result
      //     ? [
      //         ...result.map(({ uprn }) => ({
      //           type: "Address" as const,
      //           uprn,
      //         })),
      //         {
      //           type: "Addresses",
      //           id: postcode.toLowerCase().replace(/\s/g, ""),
      //         },
      //       ]
      //     : [
      //         {
      //           type: "Addresses",
      //           id: postcode.toLowerCase().replace(/\s/g, ""),
      //         },
      //       ],
    }),
    // getCollectionsByUprn: builder.query<NewCollectionInfoDto[], string>({
    //   query: (uprn) => ({
    //     url: `collections`,
    //     method: "POST",
    //     body: { uprn },
    //   }),
    // }),
  }),
});

export const { useGetAddressesByPostCodeQuery } = recyclingApi;
