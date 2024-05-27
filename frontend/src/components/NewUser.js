import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import CSS file for styling

const NewUser = () => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/users', { name })
      .then(() => window.location.href = '/')
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}  className="user-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => window.location.href = '/'}>Cancel</button>
      </form>
    </div>
  );
};

export default NewUser;
