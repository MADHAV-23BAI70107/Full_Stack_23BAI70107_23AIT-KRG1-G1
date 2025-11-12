import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || decoded?.role || '');
      } catch (e) {
        console.warn('Invalid token', e);
      }
    }         

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard</h2>
      <p>Role: <strong>{role}</strong></p>
      <hr />
      {posts.map(p => (
        <div key={p._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <h4>{p.title}</h4>
          <p>{p.content}</p>
          {(role === 'Admin' || role === 'Editor') && <button>Edit</button>}
          {role === 'Admin' && <button>Delete</button>}
        </div>
      ))}
    </div>
  );
}
