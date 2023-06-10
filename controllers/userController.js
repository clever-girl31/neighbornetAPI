const { Schema } = require('mongoose')
const { User, Thought } = require('../models')

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get one user by id
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId});
      if (!user) {
        res.status(404).json({message: 'user not found'});
      }
      return res.json(user);
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // create new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // update user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {runValidators: true, new: true}
      );
    if(!user) {
      res.status(404).json({message: "user not found"})
    }
    return res.json(user);
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  },
  // delete user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      if(!user) {
        res.status(404).json({message: "user not found"})
      }
      res.json({message: `student ${_id} deleted`})
    } catch(err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
}