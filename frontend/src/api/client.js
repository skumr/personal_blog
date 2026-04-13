const API_BASE = 'http://localhost:5000/api';

async function handleJson(response) {
    const data = await response.json();
    if (!response.ok) {
        const message = data.error || response.statusText || 'Request failed';
        throw new Error(message);
    }
    return data;
}

export async function getHome() {
    const response = await fetch(`${API_BASE}/`);
    return handleJson(response);
}

export async function getAllPosts() {
  const response = await fetch(`${API_BASE}/posts`);
  return handleJson(response);
}

export async function createPost(title, content) {
  const response = await fetch(`${API_BASE}/create-post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  return handleJson(response);
}