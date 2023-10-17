import { apiSlice } from "./apiSlice";
const SESSIONS_URL = "/api/session";

export const sessionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => ({
        url: `${SESSIONS_URL}`,
        method: "GET",
      }),
    }),
    bookSession: builder.mutation({
      query: (data) => ({
        url: `${SESSIONS_URL}/update`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSession: builder.mutation({
      query: (data) => ({
        url: `${SESSIONS_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
    createSession: builder.mutation({
      query: (data) => ({
        url: `${SESSIONS_URL}/set`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useDeleteSessionMutation,
  useCreateSessionMutation,
  useBookSessionMutation,
} = sessionsApiSlice;
