import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Note', 'Doubt', 'Answer'],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
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
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
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
  useSignupMutation,
  useLoginMutation,
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetDoubtsQuery,
  useCreateDoubtMutation,
  useGetAnswersForDoubtQuery,
  useCreateAnswerMutation,
} = apiSlice;