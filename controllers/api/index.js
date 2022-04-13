const router = require('express').Router();
const userRoutes = require('./userRoutes');
const calendarRoutes = require('./calendarRoutes');
const standardRoutes = require('./standardRoutes'); 
const classRoutes = require('./classRoutes'); 

router.use('/users', userRoutes);
router.use('/calendar', calendarRoutes);
router.use('/standard', standardRoutes);
router.use('/class', classRoutes);

module.exports = router;
