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

  function handleEditPost(updatedPost) {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.post_id === updatedPost.post_id ? updatedPost : p));
  }

  function handleDeletePost(deletedId) {
    setPosts((prevPosts) =>
      prevPosts.filter((p) => p.post_id !== deletedId));
  }

  return (
    <>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => 
        <PostCard 
          key={post.post_id} 
          post={post} 
          onEdit={handleEditPost}
          onDelete={handleDeletePost}/> )
      )
      
      }
      
      
    </>
  );
}