
const allRequests = document.querySelector('.allRequests');
const searchForm = document.querySelector('form');
const input = document.getElementById('search-input');
const requestNav =document.getElementById('ulReq');
console.log(requestNav);

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchWord = JSON.stringify({ search: input.value });
  console.log(searchWord);
  const response = await fetch('/admin/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: searchWord,
    })
    const result = await response.text();
    const div = document.getElementById('requestsTable');
    console.log(result);
    div.innerHTML = result;

})

requestNav.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log(evt.target.href);
  const response = await fetch(evt.target.href, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.text();
  const div = document.getElementById('requestsTable');
  console.log(result);
  div.innerHTML = result;

})

// document.addEventListener('DOMContentLoaded', (e) => {
//   console.log('allRequests', allRequests.childNodes);
//   allRequests.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log('event.target');
//   });
// });
console.log('allRequests', allRequests);

allRequests.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log(e.target.parentElement.id);
  if (e.target.classList.contains('td')) {
    const req = await fetch('/admin/requests/s/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  window.location.assign(`/admin/requests/${e.target.parentElement.id}`);
});


