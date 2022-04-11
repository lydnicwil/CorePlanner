const router = require('express').Router();
const userRoutes = require('./userRoutes');
const standardRoutes = require('./standardRoutes'); 
const calendarRoutes = require('./calendarRoutes');

router.use('/users', userRoutes);
router.use('/standard', standardRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;
