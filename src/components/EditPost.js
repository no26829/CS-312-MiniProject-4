import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams(); // Get the post ID from the route
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', body: '', creator_name: '' });

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error("Error fetching post:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    .then(() => {
      navigate('/'); // Go back to the post list after editing
    })
    .catch(error => console.error("Error updating post:", error));
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Body:
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="creator_name"
            value={post.creator_name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditPost;
