import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const userInfo = getState().auth.userInfo;
    if (userInfo !== null && userInfo.token !== null) {
      headers.set("Authorization", `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
