import { useState, useEffect } from 'react';

function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: Fetch forum posts from API
  }, []);

  return (
    <div className="forum">
      <h1>Forum</h1>
      <div className="posts-list">
        {/* Liste des posts */}
      </div>
    </div>
  );
}

export default Forum;
