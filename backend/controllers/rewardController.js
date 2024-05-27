const Reward = require('../models/Reward');
const User = require('../models/User');

exports.createReward = async (req, res) => {
  const { points, givenBy, givenTo } = req.body;
  try {
    const giver = await User.findById(givenBy);
    const receiver = await User.findById(givenTo);

    if (giver.p5Balance < points) {
      return res.status(400).json({ error: 'Insufficient P5 balance' });
    }

    giver.p5Balance -= points;
    receiver.rewardsBalance += points;

    const reward = new Reward({ points, givenBy, givenTo });
    await reward.save();
    await giver.save();
    await receiver.save();

    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get all rewards
exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().populate('givenBy givenTo');
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReward = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the reward by ID
    const reward = await Reward.findById(id);
    
    // Check if reward exists
    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    // Find the giver and receiver users
    const giver = await User.findById(reward.givenBy);
    const receiver = await User.findById(reward.givenTo);

    // Check if giver and receiver exist
    if (!giver || !receiver) {
      return res.status(404).json({ error: 'Giver or receiver not found' });
    }

    // Update balances
    giver.p5Balance += reward.points;
    receiver.rewardsBalance -= reward.points;

    // Save changes to users' balances and remove reward
    await Promise.all([
      giver.save(),
      receiver.save(),
      reward.deleteOne()
    ]);

    res.status(200).json({ message: 'Reward deleted' });
  } catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getRewards = async (req, res) => {
  const { id } = req.params;
  try {
    const rewardsGiven = await Reward.find({ givenBy: id }).populate('givenTo');
    const rewardsReceived = await Reward.find({ givenTo: id }).populate('givenBy');
    res.status(200).json({ rewardsGiven, rewardsReceived });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

