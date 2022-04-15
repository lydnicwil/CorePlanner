const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../../utils/fsUtils');

router.get('/', (req, res) =>
    readFromFile('./seeds/calendarData.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { start_date, end_date, title, description, teacher } = req.body;

    // If all the required properties are present
    if (start_date && end_date && title && description && teacher) {
        // Variable for the object we will save
        const newDate = {
            start_date,
            end_date,
            title,
            description,
            teacher
        };

        readAndAppend(newDate, './seeds/calendarData.json');

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