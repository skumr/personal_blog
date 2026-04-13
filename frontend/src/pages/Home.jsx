import { useEffect, useState } from 'react';
import { getHome, createPost } from '../api/client.js';
import { Loading } from '../components/Loading.jsx';
import { ErrorMessage } from '../components/ErrorMessage.jsx';

export function Home() {
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getHome();
        if (!cancelled) {
          setLastPost(result.last_post);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    if (!title.trim() || !content.trim()) {
      setFormError('Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      const result = await createPost(title.trim(), content.trim());
      setLastPost(result.last_post);
      setTitle('');
      setContent('');
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <h1>Welcome to My Blog</h1>

      <h2>Latest post</h2>
      {lastPost ? (
        <article>
          <header>
            <p>Title: {lastPost.post_title}</p>
            <p>
              Published:{' '}
              <time dateTime={lastPost.created_date}>
                {lastPost.created_date} UTC
              </time>
            </p>
          </header>
          <section>
            <p>Post: {lastPost.post_content}</p>
          </section>
        </article>
      ) : (
        <p>No posts yet.</p>
      )}

      <h3>Submit a blog post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Post Title: </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />
        </div>
        <div>
          <label htmlFor="post-content">Content: </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={saving}
            rows={5}
          />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Create Post'}
        </button>
      </form>
      {formError ? <ErrorMessage message={formError} /> : null}
    </>
  );
}