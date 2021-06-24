const btn = document.querySelector('.editBtn');

btn.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log(event.target.id);
  const response = await fetch(event.target.id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.text();
  const div = document.getElementById('reqCard');
  editDiv = document.createElement('div');
  editDiv.innerHTML = result;
  div.appendeditDiv;
})
