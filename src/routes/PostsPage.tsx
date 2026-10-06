import { PostsPanel } from '@/features/posts/PostsPanel';

export function PostsPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">Server state</p>
        <h1>Posts</h1>
        <p className="lede">
          Fetches sample posts via <strong>RTK Query</strong> (HTTP via <code>fetchBaseQuery</code>)
          .
        </p>
      </header>
      <PostsPanel />
    </div>
  );
}
