import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Reward.css'; // Import CSS file for styling

const NewReward = () => {
  const { id } = useParams();
  const [points, setPoints] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [p5Balance, setP5Balance] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data.filter(user => user._id !== id)))
      .catch(error => console.log(error));
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => setP5Balance(response.data.p5Balance))
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (points > 100 || points > p5Balance) return;
    axios.post('http://localhost:5000/api/rewards', { points, givenBy: id, givenTo: selectedUser })
      .then(() => window.location.href = `/${id}/p5`) 
      .catch(error => console.log(error));
  };

  return (
    <div className="new-reward-container">
      <h1>New Reward</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="points">Points:</label>
          <input
            id="points"
            type="number"
            value={points}
            onChange={e => setPoints(Number(e.target.value))}
            max="100"
          />
          <p className="p5-balance">P5 Balance: {p5Balance}</p>
        </div>
        <div className="form-group">
          <label htmlFor="user">Select User:</label>
          <select id="user" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button type="submit" disabled={points > 100 || points > p5Balance}>Submit</button>
          <Link to={`/`} className="cancel">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default NewReward;
