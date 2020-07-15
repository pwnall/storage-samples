'use strict';

function setCookie(key, value) {
  if (window.location.protocol === 'https:')
    key = `__Host-${key}`;
  document.cookie = `${key}=${btoa(value)};path=/;max-age=315360000`;
}

function getAllCookies() {
  return Object.fromEntries(document.cookie.split(';').map(string => {
    const [key, value] = string.split('=');
    return [key.replace(/^__Host-/i, ''), atob(value)];
  }));
}

setCookie('userid', 'pwnall');
setCookie('hello', 'world');
console.log(getAllCookies());
