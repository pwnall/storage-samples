'use strict';

// Slide 2 - Change Observation

cookieStore.addEventListener('change', event => {
  for (let change of event.changed)
    console.log(`Cookie changed: ${change.name} <- ${change.value}`);
  for (let deletion of event.deleted)
    console.log(`Cookie deleted: ${deletion.name}`);
});

// Slide 1 - Sample

async function setCookie(key, value) {
  await cookieStore.set({
    name: key, value: btoa(value), expiresAt: Date.now() + 315360000 });
}

async function getAllCookies() {
  const cookies = await cookieStore.getAll();
  return Object.fromEntries(cookies.map(cookie =>
      [cookie.name.replace(/^__Host-/i, ''), atob(cookie.value)]));
}

(async () => {
  await setCookie('userid', 'pwnall');
  await setCookie('hello', 'world');
  console.log(await getAllCookies());
})();
