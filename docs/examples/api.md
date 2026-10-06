# API layer example

**Choice:** RTK Query (fetchBaseQuery)

## Why there is no Axios/Fetch client

You selected **RTK Query**, which already provides:

- a shared base query (`fetchBaseQuery`)
- caching, deduplication, and generated hooks
- a single place for headers via `prepareHeaders`

Adding Axios/Fetch beside RTK Query usually creates **two HTTP stacks**, duplicated auth logic, and inconsistent error handling.

**Where HTTP lives:** `src/store/postsApi.ts`  
**Path constants:** `src/config/api-routes.ts` (`API_ROUTES`) and `src/config/routes.ts` (`ROUTES`)

### Extending RTK Query

```ts
import { API_ROUTES } from '@/config/api-routes';

// add to endpoints
getPostById: builder.query({
  query: (id) => API_ROUTES.post(id),
  providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
}),
```

### Auth header pattern

```ts
prepareHeaders: (headers) => {
  const token = localStorage.getItem('access_token');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return headers;
},
```

### When you might still add Axios/Fetch later

- Uploading to a third-party host that RTK should not cache
- Streaming / non-JSON APIs
- A legacy SDK that must use its own client

If that happens, isolate it under `src/services/` and keep RTK as the default for app REST resources.

See `docs/examples/data-fetching.md` for UI usage.
