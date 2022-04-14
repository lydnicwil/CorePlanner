// for bonus: + admin routes 
// standard routes to get, post, delete (if applicable)

const router = require('express').Router();
const { Standard } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) =>
  readFromFile('./seeds/standardData.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', withAuth, async (req, res) => {
  try {
    //   if we chose to let users create standards
    const newStandard = await Standard.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const standardData = await Standard.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!standardData) {
      res.status(404).json({ message: 'No standard found with this id!' });
      return;
    }

    res.status(200).json(standardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
