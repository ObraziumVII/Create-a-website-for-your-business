const allRequests = document.querySelector('.highlight');

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
