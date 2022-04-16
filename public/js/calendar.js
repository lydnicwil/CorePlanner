const projectForm = $('#project-form');
const startDate = $('#start-date-input');
const endDate = $('#end-date-input');
const calendarPop = $('#view-calendar');
const descriptionEl = $('#description');
const teacherID = $('#super-secret');
const gradeSelect = $('#grade-select');
const classSelect = $('#class-select');
const standardArea = $('#standard-area');
const standardSelect = $('#standard-select');

if (projectForm) {
  projectForm.on('submit', (e) => {
    e.preventDefault();

    $('#event-form-div').addClass('display-none');
    $('#add-event').removeClass('display-none');
    $('#view-calendar').removeClass('display-none');
    $('#back-button').addClass('display-none');
    $('#preview-calendar-div').removeClass('display-none');
    $('#calendar-div').addClass('display-none');
    $('#select-div').addClass('display-none');

    // Get the feedback text from the DOM and assign it to a variable
    let start_date = startDate[0].value;
    // Get the username text and add it to a variable
    let end_date = endDate[0].value;

    let description = descriptionEl[0].value;

    let teacher = teacherID[0].innerHTML;

    let gradeSelection = gradeSelect[0].value;

    let classSelection = classSelect[0].value;

    let standardSelection = standardSelect[0].value;

    // Create an object with the username and feedback
    const newDate = {
      description,
      start_date,
      end_date,
      gradeSelection,
      classSelection,
      standardSelection,
      teacher
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
        descriptionEl.value = '';
        location.reload();
      });
  })
}

if (calendarPop) {
  calendarPop.on('click', (e) => {
    e.preventDefault();

    $('#calendar').empty();

    fetch('api/calendar',
      {
        method: 'GET'
      })
      .then(res => {
        res.json()
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            ({ description, start_date, end_date, gradeSelection, classSelection, standardSelection, teacher } = data[i]);

            if (teacher != teacherID[0].innerHTML) { continue; }

            let li = $("<li>");

            li.append(`<p>Grade: ${gradeSelection}</p><p>Class: ${classSelection}</p><p>Standard: ${standardSelection}</p><p>Description: ${description}</p><p>Start Date: ${start_date}</p><p>End Date: ${end_date}</p>`);

            $('#calendar').append(li);
          };

        })
      })
  })
}

fetch('api/calendar', {
  method: 'GET'
})
.then(res => {
  res.json()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        ({ description, start_date, end_date, gradeSelection, classSelection, standardSelection, teacher } = data[i]);

        if (i >= 3 || teacher != teacherID[0].innerHTML) { continue; }

        let li = $("<li>");

        li.append(`<p>Grade: ${gradeSelection}</p><p>Class: ${classSelection}</p><p>Standard: ${standardSelection}</p><p>Description: ${description}</p><p>Start Date: ${start_date}</p><p>End Date: ${end_date}</p>`);

        $('#preview-calendar').append(li);
      };

    })
})

startDate.datepicker({ minDate: 1 });
endDate.datepicker({ minDate: 1 });

$('#view-calendar').on('click', (e) => {
  e.preventDefault();

  $('#event-form-div').addClass('display-none');
  $('#add-event').addClass('display-none');
  $('#view-calendar').addClass('display-none');
  $('#back-button').removeClass('display-none');
  $('#preview-calendar-div').addClass('display-none');
  $('#calendar-div').removeClass('display-none');
})

$('#back-button').on('click', (e) => {
  e.preventDefault();

  $('#event-form-div').addClass('display-none');
  $('#add-event').removeClass('display-none');
  $('#view-calendar').removeClass('display-none');
  $('#back-button').addClass('display-none');
  $('#preview-calendar-div').removeClass('display-none');
  $('#calendar-div').addClass('display-none');
})

$('#add-event').on('click', (e) => {
  e.preventDefault();

  $('#event-form-div').removeClass('display-none');
  $('#add-event').addClass('display-none');
  $('#view-calendar').addClass('display-none');
  $('#back-button').removeClass('display-none');
  $('#preview-calendar-div').addClass('display-none');
  $('#calendar-div').addClass('display-none');
  $('#select-div').removeClass('display-none');

  let str = standardArea[0].value.split('\n');

  for (let i = 0; i < str.length; i++) {
    if (str[i] != '') {
      standardSelect.append(`<option>${str[i]}</option>`)
    }
  }
})

fetch('api/class', {
  method: 'GET'
})
.then(res => {
  res.json()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        ({ gradeSelected, classSelected, standardSelected, teacher } = data[i]);
        
        standardArea[0].value = '';

        let Standards = standardSelected.split("\n");

        if (gradeSelected == gradeSelect[0].value && classSelected == classSelect[0].value && teacher == teacherID[0].innerHTML) {
          
          for (let j = 0; j < Standards.length; j++) {
            standardArea[0].value += `${Standards[j]}\n`;
          }
          return;
        }

        else
        {
          standardArea[0].value += "This user doesn't have acess to these standards.";
        }
      };

    })
})

gradeSelect.on('change', (e) => {
  e.preventDefault();

  standardArea[0].value = '';

  fetch('api/class', {
    method: 'GET'
  })
  .then(res => {
    res.json()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          ({ gradeSelected, classSelected, standardSelected, teacher } = data[i]);
          
          standardArea[0].value = '';
  
          let Standards = standardSelected.split("\n");
  
          if (gradeSelected == gradeSelect[0].value && classSelected == classSelect[0].value && teacher == teacherID[0].innerHTML) {
            
            for (let j = 0; j < Standards.length; j++) {
              standardArea[0].value += `${Standards[j]}\n`;
            }
            return;
          }
          else
          {
            standardArea[0].value += "This user doesn't have acess to these standards.";
          }
        };
  
      })
  })
});

classSelect.on('change', (e) => {
  e.preventDefault();

  standardArea[0].value = '';

  fetch('api/class', {
    method: 'GET'
  })
  .then(res => {
    res.json()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          ({ gradeSelected, classSelected, standardSelected, teacher } = data[i]);
          
          standardArea[0].value = '';
  
          let Standards = standardSelected.split("\n");

          if (gradeSelected == gradeSelect[0].value && classSelected == classSelect[0].value && teacher == teacherID[0].innerHTML) {
            
            for (let j = 0; j < Standards.length; j++) {
              standardArea[0].value += `${Standards[j]}\n`;
            }
            return;
          }
  
          else
          {
            standardArea[0].value += "This user doesn't have acess to these standards.";
          }
        };
  
      })
  })
});