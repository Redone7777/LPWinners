import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ForumPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // TODO: Fetch post details from API
  }, [id]);

  return (
    <div className="forum-post">
      <h1>Post du Forum</h1>
      {/* Contenu du post et commentaires */}
    </div>
  );
}

export default ForumPost;
