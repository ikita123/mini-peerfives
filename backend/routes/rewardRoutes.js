const express = require('express');
const { createReward, deleteReward, getRewards, getAllRewards } = require('../controllers/rewardController');
const { getP5HistoryByUserId } = require('../controllers/p5Controller');

const router = express.Router();

router.post('/', createReward);
router.delete('/:id', deleteReward);
router.get('/:id', getRewards);
// Define route to get P5 history for a specific user by user ID
router.get('/p5/:userId', getP5HistoryByUserId);
router.get('/', getAllRewards); // Route to get all rewards

module.exports = router;
