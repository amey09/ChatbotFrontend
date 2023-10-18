import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_BASE_API_URL,
    credentials: "include"
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({}),
});
