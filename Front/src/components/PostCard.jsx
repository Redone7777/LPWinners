import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <Link to={`/forum/${post.id}`} className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 150)}...</p>
      <div className="post-meta">
        <span>👍 {post.upvotes}</span>
        <span>💬 {post.comments_count}</span>
      </div>
    </Link>
  );
}

export default PostCard;
