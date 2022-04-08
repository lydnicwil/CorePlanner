const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./standardRoutes'); 

router.use('/users', userRoutes);
router.use('/standard', standardRoutes);

module.exports = router;
