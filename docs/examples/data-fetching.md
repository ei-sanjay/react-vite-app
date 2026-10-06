# Data fetching example

**Library:** RTK Query
**Transport:** RTK Query `fetchBaseQuery` (no separate Axios/Fetch client)

**Live demo:** `/posts` → `src/features/posts/PostsPanel.tsx`

## When to use

Any remote read/write that benefits from caching, deduplication, retries, or background refresh:

- lists and detail pages
- polling dashboards
- mutations that should refresh related queries

## How to use in this project

### 1. Define endpoints

See `src/store/postsApi.ts`:

```ts
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts?_limit=5',
      providesTags: ['Posts'],
    }),
    createFeedback: builder.mutation({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: ['Posts'],
    }),
  }),
});
```

### 2. Consume hooks in UI

```tsx
const { data, isLoading, error, refetch, isFetching } = useGetPostsQuery();
const [createFeedback] = useCreateFeedbackMutation();
await createFeedback(values).unwrap();
```

### Best practices (RTK Query)

- Prefer **tags** over manual `refetch()` for coherence after writes.
- Keep `prepareHeaders` as the single place for auth.
- Split large APIs with `injectEndpoints` as the app grows.
- Use `transformResponse` for shaping DTO → UI models at the boundary.
- Handle errors with `error` from the hook; surface user-friendly messages in UI.

## Best practice (all libraries)

Separate **server cache** from **client UI state**. Key queries by resource identity, not by component instance.

## Related docs

- HTTP transport details: `docs/examples/api.md`
- Architecture boundaries: `docs/architecture.md`
