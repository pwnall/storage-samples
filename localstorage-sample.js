'use strict';

window.addEventListener('storage', event => {
  // Fires for changes from other tabs.
  if (event.storageArea == localStorage)
    console.log(`localStorage change: ${event.key} <- ${event.newValue}`);
});

localStorage.setItem('userid', 'pwnall');
localStorage.setItem('hello', 'world');
console.log(localStorage.getItem('userid'));
