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
