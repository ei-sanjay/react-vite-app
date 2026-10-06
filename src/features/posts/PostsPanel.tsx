import { useGetPostsQuery } from '@/store/postsApi';

export function PostsPanel() {
  const { data, isLoading, error, refetch, isFetching } = useGetPostsQuery();

  return (
    <article className="panel">
      <header className="panel-header">
        <h2>Server state</h2>
        <p>RTK Query · JSONPlaceholder posts</p>
      </header>

      <div className="panel-toolbar">
        <button
          type="button"
          className="ui-button"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {isLoading && <p className="muted">Loading posts…</p>}
      {error && (
        <p className="error-text">{error instanceof Error ? error.message : 'Request failed'}</p>
      )}
      {data && (
        <ul className="post-list">
          {data.map((post: { id: number; title: string }) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      )}

      <p className="panel-note">
        <strong>When to use:</strong> remote data with caching, retries, and refetch rules.
        <br />
        <strong>Best practice:</strong> treat server cache separately from UI/client state.
      </p>
    </article>
  );
}
