import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nominatim.openstreetmap.org/",
  }),
  endpoints: (builder) => ({
    searchLocation: builder.query({
      query: (query: string) => ({
        url: `search`,
        params: {
          q: query,
          format: "json",
        },
      }),
    }),
  }),
});

export const { useSearchLocationQuery } = mapApi;