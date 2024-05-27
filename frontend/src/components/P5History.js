import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './P5History.css'; // Import CSS file for styling

const P5History = () => {
  const { id } = useParams();
  const [p5History, setP5History] = useState([]);
  const [p5Balance, setP5Balance] = useState(0);
  const [p5AllRewards, setP5AllRewards] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rewards/p5/${id}`)
      .then(response => setP5History(response.data))
      .catch(error => console.log(error));
    axios.get(`http://localhost:5000/api/rewards/`)
      .then(response => {
        const rewards = response.data.filter(reward => reward.givenBy._id === id);
        setP5AllRewards(rewards);
      })
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => setP5Balance(response.data.p5Balance))
      .catch(error => console.log(error));
  }, [id]);

  const handleDelete = (rewardId) => {
    axios.delete(`http://localhost:5000/api/rewards/${rewardId}`)
      .then(() => {
        // Refresh the page after successful delete
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>P5 History</h1>
      <p>P5 Balance: {p5Balance}</p>
      <Link to={`/${id}/rewards/new`} >Create New Reward</Link>
      <table className="reward-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>Points</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {p5AllRewards.map((reward, index) => (
            <tr key={reward._id}>
              <td>{index + 1}</td>
              <td>{new Date(reward.timestamp).toLocaleString()}</td>
              <td>{reward.givenBy.name}</td>
              <td>{reward.points}</td>
              <td>{reward.givenTo.name}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(reward._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
