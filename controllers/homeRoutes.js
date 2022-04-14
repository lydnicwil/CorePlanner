const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    //     // Get all standards and JOIN with user data
    //     const standardData = await Standard.findAll({
    //       include: [
    //         {
    //           model: User,
    //           attributes: ['name'],
    //         },
    //       ],
    //     });

    //     // // Serialize data so the template can read it onto homepage
    //     const standards = standardData.map((standard) => standard.get({ plain: true }));

    // // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/standard/:id', async (req, res) => {
//   try {
//     const standardData = await Standard.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const standard = standardData.get({ plain: true });

//     res.render('standard', {
//       ...standard,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
      // is_Admin: userData.isAdmin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/'); //can redirect to profile
    return;
  }

  res.render('login');
});

router.get('/calendar', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('calendar', {
      ...user,
      logged_in: true
      // is_Admin: userData.isAdmin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('project', {
      ...user,
      logged_in: true
      // is_Admin: userData.isAdmin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/standards', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('standards', {
      ...user,
      logged_in: true
      // is_Admin: userData.isAdmin
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
