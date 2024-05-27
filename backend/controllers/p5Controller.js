const Reward = require('../models/Reward');
// Controller function to get P5 history for a specific user by user ID
exports.getP5HistoryByUserId = async (req, res) => {
  try {
    // Retrieve user ID from request parameters
    const { userId } = req.params;

    // Fetch P5 history for the specified user from the database
    const p5History = await Reward.find({ givenTo: userId });

    // Send the P5 history as a response
    res.status(200).json(p5History);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching P5 history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
