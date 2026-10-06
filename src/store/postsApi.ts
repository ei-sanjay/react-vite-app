import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ROUTES } from '@/config/api-routes';
import { env } from '@/config/env';
import type { FeedbackPayload, Post } from '@/types/models';

/**
 * RTK Query owns HTTP for this stack — no separate Axios/Fetch client is generated.
 * Use `prepareHeaders` for auth and `tagTypes` for cache invalidation.
 */
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers) => {
      const token =
        typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => API_ROUTES.postsList(),
      providesTags: ['Posts'],
    }),
    createFeedback: builder.mutation<{ id: number }, FeedbackPayload>({
      query: (body) => ({
        url: API_ROUTES.posts,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useCreateFeedbackMutation } = postsApi;
