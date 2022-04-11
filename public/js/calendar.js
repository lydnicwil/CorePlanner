const projectForm = $('#project-form');
const startDate = $('#start-date-input');
const endDate = $('#end-date-input');
const calendarPop = $('#calendar-filler');
const titleEl = $('#title');
const descriptionEl = $('#description');

if (projectForm) {
  projectForm.on('submit', (e) => {
    e.preventDefault();

    // Get the feedback text from the DOM and assign it to a variable
    let start_date = startDate[0].value;
    // Get the username text and add it to a variable
    let end_date = endDate[0].value;

    let title = titleEl[0].value;

    let description = descriptionEl[0].value;

    // Create an object with the username and feedback
    const newDate = {
      title,
      description,
      start_date,
      end_date,
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
        titleEl[0].value = '';
        descriptionEl[0].value = '';
      });
  })
}

startDate.datepicker({ minDate: 1 });
endDate.datepicker({ minDate: 1 });

$("#add-event").on('click', (e) => {
  e.preventDefault();

  $("#add-event").addClass("display-none");
  $("#view-calendar").addClass("display-none");
  $("#calendar-div").addClass("display-none");
  $("#event-form-div").removeClass("display-none");
  $("#back-button").removeClass("display-none");
  $("#preview-calendar-div").addClass("display-none");
  
});

$("#view-calendar").on('click', (e) => {
  e.preventDefault();

  $("#add-event").addClass("display-none");
  $("#event-form-div").addClass("display-none");
  $("#view-calendar").addClass("display-none");
  $("#calendar-div").removeClass("display-none");
  $("#back-button").removeClass("display-none");
  $("#preview-calendar-div").addClass("display-none");

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
});

$("#back-button").on('click', (e) => {
  e.preventDefault();

  $("#add-event").removeClass("display-none");
  $("#event-form-div").addClass("display-none");
  $("#view-calendar").removeClass("display-none");
  $("#calendar-div").addClass("display-none");
  $("#back-button").addClass("display-none");
  $("#preview-calendar-div").removeClass("display-none");
});

fetch('api/calendar',
    {
      method: 'GET'
    }).then(res => {
      res.json().then(data => {
        for (let i = 0; i < data.length; i++) {
          if(i >= 3)
          {
            break;
          }
          ({ title, description, start_date, end_date } = data[i]);

          let li = $("<li>");

          li.append(`<p>${title}</p><p>${description}</p><p>${start_date}</p><p>${end_date}</p>`);

          $('#preview-calendar').append(li);
        };

      })
    })