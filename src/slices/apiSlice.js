import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://chatbot-backend-amey-mhatres-projects.vercel.app',
    prepareHeaders: (headers, {getState}) => {
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
