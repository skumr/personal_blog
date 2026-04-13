import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/client.js';
import { Loading } from '../components/Loading.jsx';
import { ErrorMessage } from '../components/ErrorMessage.jsx';
import { PostCard } from '../components/PostCard.jsx';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getAllPosts();
        if (!cancelled) {
          setPosts(result.all_posts || []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <h1>All Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.post_id} post={post} />)
      )}
    </>
  );
}