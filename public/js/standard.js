const newFormHandler = async (event) => {
  event.preventDefault();

  // const lessonName = document.querySelector('#lesson-name').value.trim();
  const standardName = document.querySelector('#standard-dropdown').value.trim();
  // const objective = document.querySelector('#objective-info').value.trim();

  if (standard-dropdown) {
    const response = await fetch(`/api/`, {
      method: 'GET',
      body: JSON.stringify({standardName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create standard lesson plan');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/standards/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete standard lesson plan');
    }
  }
};

document
  .querySelector('.new-standardLesson-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.standardLesson-list')
  .addEventListener('click', delButtonHandler);
