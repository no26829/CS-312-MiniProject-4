import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './main.css';


function PostList() {
  const [posts, setPosts] = useState([]);
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error("Error fetching posts:", error));
  };

  const onDelete = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator_name: user.name })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setPosts(posts.filter(post => post.id !== id));
      }
    })
    .catch(error => console.error("Error deleting post:", error));
  };

  return (
    <div className="banner">
      <div className="heading-container">
        <h1>Naima's Blog Post application</h1>
        <img src="/happy-cat.gif" alt="Happy Cat" className="heading-gif" />
      </div>
      <button className="button" onClick={signOut}>Sign Out</button>
      <div className="container">
        {posts.map(post => (
          <div key={post.id} className="post-container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p><strong>Author:</strong> {post.creator_name}</p>
            {user && user.name === post.creator_name && (
              <>
                <button className="button" onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                <button className="button" onClick={() => onDelete(post.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <button className="button" onClick={() => navigate('/new')}>Add New Post</button>
    </div>
  );
}

export default PostList;
