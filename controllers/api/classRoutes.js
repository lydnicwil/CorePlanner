const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../../utils/fsUtils');

router.get('/', (req, res) =>
  readFromFile('./seeds/classData.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    console.log("!");
    const { gradeSelected, classSelected, standardSelected, teacher} = req.body;

  // If all the required properties are present
  if (gradeSelected && classSelected && standardSelected && teacher) {
    // Variable for the object we will save
    const newClass = {
      gradeSelected,
      classSelected,
      standardSelected,
      teacher
    };

        readAndAppend(newClass, './seeds/classData.json');

        const response = {
            status: 'success',
            body: newClass,
        };

        res.json(response);
    } else {
        res.json('Error in posting review');
    }
});

module.exports = router;