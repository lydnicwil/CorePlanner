// for bonus: + admin routes 
// standard routes to get, post, delete (if applicable)

const router = require('express').Router();
const { Standard } = require('../../models');
const withAuth = require('../../utils/auth');
const { readAndAppend, readFromFile } = require('../../utils/fsUtils');

router.get('/', (req, res) =>
  readFromFile('./seeds/standardData.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', withAuth, (req, res) => {
  // Destructuring assignment for the items in req.body
  const { gradeSelected, classSelected, teacher} = req.body;

  // If all the required properties are present
  if (gradeSelected && classSelected && teacher) {
    // Variable for the object we will save
    const newClass = {
      gradeSelected,
      classSelected,
      teacher
    };

    readAndAppend(newClass, './seeds/standardData.json');

    const response = {
      status: 'success',
      body: newClass,
    };

    res.json(response);
  } else {
    res.json('Error in posting review');
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
