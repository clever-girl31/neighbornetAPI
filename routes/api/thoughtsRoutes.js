const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  reactToThought,
  deleteReaction,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought)

router
  .route('/:thoughtId/reactions')
  .post(reactToThought)
  .delete(deleteReaction)

  module.exports = router;