const cal = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

cal.get('/', (req, res) =>
  readFromFile('./seeds/calendar.json').then((data) => res.json(JSON.parse(data)))
);

cal.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { start_date, end_date } = req.body;

    // If all the required properties are present
    if (start_date && end_date) {
        // Variable for the object we will save
        const newDate = {
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

module.exports = cal;