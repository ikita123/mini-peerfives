import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Import CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="user-list-container">
      <h1 className="user-list-header">Users List</h1>
      <Link to="/new">Create New User</Link>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Login</th>
            <th colSpan="4">Actions</th> {/* Grouped column for actions */}

          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.p5Balance}</td>
                <td>{user.rewardsBalance}</td>
                <td><Link to={`/${user._id}`}>Edit</Link></td>
                <td><Link to={`/${user._id}/rewards/new`}>New Reward</Link></td>
                <td><Link to={`/${user._id}/p5`}>P5 History</Link></td>
                <td><Link to={`/${user._id}/rewards`}>Rewards History</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
