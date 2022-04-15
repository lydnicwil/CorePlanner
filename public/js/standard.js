const projectForm = $('#project-form');
const gradeSelect = $('#grade-select');
const classSelect = $('#class-select');
const standardArea = $('#standard-area');
const addClass = $('#add-class');
const teacherID = $('#super-secret');

if (projectForm) {
  projectForm.on('submit', (e) => {
    e.preventDefault();

    // Get the feedback text from the DOM and assign it to a variable
    let gradeSelected = gradeSelect[0].value;
    // Get the username text and add it to a variable
    let classSelected = classSelect[0].value

    let standardSelected = standardArea[0].value;

    let teacher = teacherID[0].innerHTML;

    // Create an object with the username and feedback
    const newClass = {
      gradeSelected,
      classSelected,
      standardSelected,
      teacher
    };

    // Fetch POST request to the server
    fetch('api/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClass),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
      });
  });
}

fetch('api/standards',
  {
    method: 'GET'
  }).then(res => {
    res.json().then(data => {
      for (let i = 0; i < data.length; i++) {
        ({ Grade, Class, Standards } = data[i]);

        if (Grade == gradeSelect[0].value && Class == classSelect[0].value) {

          for (let j = 0; j < Standards.length; j++) {
            standardArea[0].value += `${Standards[j]}\n`;
          }
        }
      };

    })
  })

gradeSelect.on('change', (e) => {
  e.preventDefault();

  standardArea[0].value = '';

  fetch('api/standards',
    {
      method: 'GET'
    }).then(res => {
      res.json().then(data => {
        for (let i = 0; i < data.length; i++) {
          ({ Grade, Class, Standards } = data[i]);

          if (Grade == gradeSelect[0].value && Class == classSelect[0].value) {

            for (let j = 0; j < Standards.length; j++) {
              standardArea[0].value += `${Standards[j]}\n`;
            }
          }
        };

      })
    })
});

classSelect.on('change', (e) => {
  e.preventDefault();

  standardArea[0].value = '';

  fetch('api/standards',
    {
      method: 'GET'
    }).then(res => {
      res.json().then(data => {
        for (let i = 0; i < data.length; i++) {
          ({ Grade, Class, Standards } = data[i]);

          if (Grade == gradeSelect[0].value && Class == classSelect[0].value) {

            for (let j = 0; j < Standards.length; j++) {
              standardArea[0].value += `${Standards[j]}\n`;
            }
          }
        };

      })
    })
});