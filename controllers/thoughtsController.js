const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models')

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get single thought by id
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: "thought not found"})
      }

      res.json(thought)
    } catch(err) {
      console.log(err);
      return res.status(500).jsonj(err);
    }
  },
  // create new thought, push author/user's _id to a/u's thoughts array field
  async createThough(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const userId = req.userId;
      const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
      )
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true}
      );

      if (!thought) {
        res.status(404).json({ message: "no thought with this id. this id is thoughtless"})
      }
      res.json(thought)
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // delete thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId})

      if (!thought) {
        res.status(404).json({message: "no thought with that id"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
}