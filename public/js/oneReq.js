document.addEventListener('DOMContentLoaded', (evt) => {

  const btn = document.querySelector('.editBtn');
  const editForm = document.querySelector('.editForm');
  const input = document.querySelector('#adminCom');
  const selectInput = document.querySelector('#select');

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const edit = document.querySelector('.row');
    edit.classList.toggle('editHidden');
    edit.classList.toggle('editVisible');
  })

  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = input.value;
    const select = selectInput.value;
    const id = event.target.id;
    console.log(comment);
    console.log(select);
    console.log(id);
    const editInfo = JSON.stringify({ adminComment: comment, status: select, _id: id });
    const response = await fetch(`/admin/requests/${event.target.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: editInfo,
      })
    const result = await response.text();
    console.log(result);
    document.body.innerHTML = result;

  })
})
