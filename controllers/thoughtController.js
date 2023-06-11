const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
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

      return res.json(thought)
    } catch(err) {
      console.log(err);
      return res.status(500).jsonj(err);
    }
  },
  // create new thought, push author/user's _id to a/u's thoughts array field
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const username = req.body.username;
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({message: 'user not found'})
      }
      const userId = user._id
      
      const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
      )
      return res.json({newThought, updatedUser});
    } catch (err) {
      console.log(err)
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
      return res.json(thought)
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
      return res.json({message: "deleted Thought"})
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // create reaction
  async reactToThought(req, res) {
    try {
      const { reactionBody, username } = req.body
      const thoughtId = req.params.thoughtId

      console.log(thoughtId)
      const thought = await Thought.findOne({ _id: thoughtId})
      
      if(!thought) {
        res.status(404).json({ message: "thought not found"})
      }

      thought.reactions.push({ reactionBody, username })
      const reactedThought = await thought.save()
      return res.json(reactedThought)
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // delete a reaction
  async deleteReaction(req, res) {
    try {
    const { thoughtId } = req.params
    const { reactionId } = req.body;

    const thought = await Thought.findOne({ _id: thoughtId});
    const reaction = thought.reactions.id(reactionId);

    if(!reaction) {
      res.status(404).json({message: 'reaction not found'})
    }
    reaction.deleteOne();
    await thought.save();

    return res.json({message: "reaction deleted"});
    } catch(err) {
    console.log(err);
    res.status(500).json(err)
    }
  }
}