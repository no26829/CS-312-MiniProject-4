// src/App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, signOut }}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={isAuthenticated ? <PostList /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/edit/:id" element={isAuthenticated ? <EditPost /> : <Navigate to="/signin" />} />
            <Route path="/new" element={isAuthenticated ? <NewPost /> : <Navigate to="/signin" />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
