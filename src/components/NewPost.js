import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // gets user that is logged in

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create a post.:c");
      return;
    }

    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
        creator_name: user.name // sets the user name
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        navigate('/'); // goes to the main posts page
      }
    })
    .catch(() => setError("An error occurred while creating the post :c"));
  };

  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;
