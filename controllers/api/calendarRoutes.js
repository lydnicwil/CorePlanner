const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../../utils/fsUtils');

router.get('/', (req, res) =>
  readFromFile('./seeds/calendar.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, description, start_date, end_date } = req.body;

    // If all the required properties are present
    if (start_date && end_date) {
        // Variable for the object we will save
        const newDate = {
            title, 
            description,
            start_date,
            end_date
        };

        readAndAppend(newDate, './seeds/calendar.json');

        const response = {
            status: 'success',
            body: newDate,
        };

        res.json(response);
    } else {
        res.json('Error in posting review');
    }
});

module.exports = router;