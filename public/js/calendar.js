const projectForm = $('#project-form');
const startDate = $('#start-date-input');
const endDate = $('#end-date-input');
const calendarPop = $('#calendar-filler');

if (projectForm) {
  projectForm.on('submit', (e) => {
    e.preventDefault();

    // Get the feedback text from the DOM and assign it to a variable
    let start_date = startDate[0].value;
    // Get the username text and add it to a variable
    let end_date = endDate[0].value;

    // Create an object with the username and feedback
    const newDate = {
      start_date,
      end_date
    };



    // Fetch POST request to the server
    fetch('api/calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDate),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
        startDate[0].value = '';
        endDate[0].value = '';
      });
  })
}

startDate.datepicker({ minDate: 1 });
endDate.datepicker({ minDate: 1 });

if (calendarPop) {
  calendarPop.on('click', (e) => {
    e.preventDefault();

    $('#calendar').empty();

    fetch('api/calendar',
      {
        method: 'GET'
      }).then(res => {
        res.json().then(data => {
          for (let i = 0; i < data.length; i++) {
            ({ title, description, start_date, end_date } = data[i]);

            let li = $("<li>");

            li.append(`<p>${title}</p><p>${description}</p><p>${start_date}</p><p>${end_date}</p>`);

            $('#calendar').append(li);
          };

        })
      })
  })
}