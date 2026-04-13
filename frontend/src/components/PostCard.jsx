export function PostCard({ post }) {
  return (
    <article
      style={{
        border: '1px solid #ddd',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <p>
        <strong>#{post.post_id}</strong>
      </p>
      <h2>{post.post_title}</h2>
      <p>{post.post_content}</p>
      <p>
        <time dateTime={post.created_date}>{post.created_date} UTC</time>
      </p>
    </article>
  );
}