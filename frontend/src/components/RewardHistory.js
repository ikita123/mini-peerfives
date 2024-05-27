import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Reward.css'; // Import CSS file for styling

const RewardHistory = () => {
  const { id } = useParams();
  const [rewardsHistory, setRewardsHistory] = useState([]);
  const [rewardsBalance, setRewardsBalance] = useState(0);
  const [allRewards, setAllRewards] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rewards/${id}`)
      .then(response => setRewardsHistory(response.data.rewardsGiven))
      .catch(error => console.log(error));
    axios.get(`http://localhost:5000/api/rewards/`)
      .then(response => {
        const rewards = response.data.filter(reward => reward.givenTo._id === id);
        setAllRewards(rewards);
      })
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => setRewardsBalance(response.data.rewardsBalance))
      .catch(error => console.log(error));
  }, [id]);

  const handleDelete = (rewardId) => {
    axios.delete(`http://localhost:5000/api/rewards/${rewardId}`)
      .then(() => {
        // If deletion is successful, remove the reward from the state
        setAllRewards(allRewards.filter(reward => reward._id !== rewardId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="reward-history-container">
      <h1 className="reward-history-header">Rewards History</h1>
      <p>Rewards Balance: {rewardsBalance}</p>
      <table className="reward-history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>Points</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allRewards.map((reward, index) => (
            <tr key={reward._id}>
              <td>{index + 1}</td>
              <td>{new Date(reward.timestamp).toLocaleString()}</td>
              <td>{reward.givenTo.name}</td>
              <td>{reward.points}</td>
              <td>{reward.givenBy.name}</td>
              <td><button className="reward-history-delete-button" onClick={() => handleDelete(reward._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
