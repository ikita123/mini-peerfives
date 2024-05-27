import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import UserList from './components/UserList';
import NewUser from './components/NewUser';
import UserDetail from './components/UserDetail';
import P5History from './components/P5History';
import RewardHistory from './components/RewardHistory';
import NewReward from './components/NewReward';

const App = () => (
  <Routes>
    <Route path="/" element={<UserList />} /> {/* Change path to "/userList" */}
    <Route path="/new" element={<NewUser />} />
    <Route path="/:id" element={<UserDetail />} />
    <Route path="/:id/p5" element={<P5History />} />
    <Route path="/:id/rewards" element={<RewardHistory />} />
    <Route path="/:id/rewards/new" element={<NewReward />} />
  </Routes>
);

export default App;
