import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Import CSS file for styling


const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', p5Balance: 0, rewardsBalance: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/users/${id}`, user)
      .then(() => window.location.href = `/`) // 
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}  className="user-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => window.location.href = '/'}>Cancel</button>
      </form>
    </div>
  );
};

export default UserDetail;
