const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);


module.exports = router;
