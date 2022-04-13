const router = require('express').Router();
const userRoutes = require('./userRoutes');
const calendarRoutes = require('./calendarRoutes');
// const standardRoutes = require('./standardRoutes'); 

router.use('/users', userRoutes);
router.use('/calendar', calendarRoutes);
// router.use('/standard', standardRoutes);

module.exports = router;
