import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Note', 'Doubt', 'Answer'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/notes',
      providesTags: ['Note'],
    }),
    createNote: builder.mutation({
      query: (newNote) => ({
        url: '/notes',
        method: 'POST',
        body: newNote,
      }),
      invalidatesTags: ['Note'],
    }),
    getDoubts: builder.query({
      query: () => '/doubts',
      providesTags: ['Doubt'],
    }),
    createDoubt: builder.mutation({
      query: (newDoubt) => ({
        url: '/doubts',
        method: 'POST',
        body: newDoubt,
      }),
      invalidatesTags: ['Doubt'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useGetDoubtsQuery,
  useCreateDoubtMutation,
} = apiSlice;