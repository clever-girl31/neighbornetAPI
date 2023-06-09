const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController')

// /api/user
router.route('/').get(getAllUsers).post(createUser)

// /api/user/:userId
router
  .route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser)

  module.exports = router