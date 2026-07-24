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
    getAnswersForDoubt: builder.query({
      query: (doubtId) => `/answers/doubt/${doubtId}`,
      providesTags: ['Answer'],
    }),
    createAnswer: builder.mutation({
      query: (newAnswer) => ({
        url: '/answers',
        method: 'POST',
        body: newAnswer,
      }),
      invalidatesTags: ['Answer'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useGetDoubtsQuery,
  useCreateDoubtMutation,
  useGetAnswersForDoubtQuery,
  useCreateAnswerMutation,
} = apiSlice;