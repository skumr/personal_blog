import { useEffect, useState } from 'react';
import { getHome, createPost } from '../api/client.js';
import { Loading } from '../components/Loading.jsx';
import { ErrorMessage } from '../components/ErrorMessage.jsx';
import { LastPostCard } from '../components/LastPostCard.jsx'

export function Home() {
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    let completed = false;

    async function load() {
      try {
        const result = await getHome();
        if (!completed) {
          setLastPost(result.last_post);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
        }
      } finally {
        if (!completed) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      completed = true;
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
      <h3>Last Blog Post -</h3>
      <LastPostCard post={lastPost}/>
      
      <h3>Submit a Blog Post -</h3>
      <article
        id='new-post'
        style={{
          border: '1px solid #ddd',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className='post-title-input' style={{marginBottom: '1rem'}}>
            <input
              id="post-title"
              type="text"
              value={title}
              placeholder='Enter post title here!'
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
              
              required
              style={{width: "600px"}}
            />
          </div>
          <div className='post-content-input' style={{marginBottom: '1rem'}}>
            <textarea
              id="post-content"
              type="text"
              value={content}
              placeholder='Say what you have to say!'
              style={{width: "600px", resize: 'none'}}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={saving}
            />
          </div>
          <button type="submit" disabled={saving} style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto'}}>
            {saving ? 'Saving…' : 'Submit'}
          </button>
          
        </form>
      </article>
      
      {formError ? <ErrorMessage message={formError} /> : null}
    </>
  );
}