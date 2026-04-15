export function LastPostCard({ post }) {

  return (
    <article style={{border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>{post.post_title}</h3>
        <strong>#{post.post_id}</strong>
      </div>
        <p style={{ fontSize: "13px"}}>
          <strong>Published: </strong>
          <time dateTime={post.created_date}>{post.created_date} UTC</time>
        </p>
      <p>{post.post_content}</p>
    </article>
  );
}