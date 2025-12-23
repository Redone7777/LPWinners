const API_BASE_URL = 'http://localhost:8000';

// Champions
export const getChampions = async () => {
  const response = await fetch(`${API_BASE_URL}/api/champions`);
  return response.json();
};

export const getChampion = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/champions/${id}`);
  return response.json();
};

// Players
export const searchPlayer = async (name, region) => {
  const response = await fetch(`${API_BASE_URL}/api/players/search?name=${name}&region=${region}`);
  return response.json();
};

export const getPlayerMatches = async (playerId) => {
  const response = await fetch(`${API_BASE_URL}/api/players/${playerId}/matches`);
  return response.json();
};

// Forum
export const getForumPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/forum/posts`);
  return response.json();
};

export const getForumPost = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/forum/posts/${id}`);
  return response.json();
};

export const createForumPost = async (postData) => {
  const response = await fetch(`${API_BASE_URL}/api/forum/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });
  return response.json();
};

// Pro Stats
export const getProMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/pro/matches`);
  return response.json();
};

// Authentication
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur de connexion');
  }
  return response.json();
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur d\'inscription');
  }
  return response.json();
};

// Items
export const getItems = async () => {
  const response = await fetch(`${API_BASE_URL}/api/items`);
  return response.json();
};

// Spells
export const getSpells = async () => {
  const response = await fetch(`${API_BASE_URL}/api/spells`);
  return response.json();
};

// Runes
export const getRunes = async () => {
  const response = await fetch(`${API_BASE_URL}/api/runes`);
  return response.json();
};

// Comments
export const getPostComments = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/api/forum/posts/${postId}/comments`);
  return response.json();
};

export const createComment = async (postId, commentData) => {
  const response = await fetch(`${API_BASE_URL}/api/forum/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(commentData)
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création du commentaire');
  }
  return response.json();
};
