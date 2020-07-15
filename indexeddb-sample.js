'use strict';

// Slide 1

async function openIndexedDB(dbName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = event => {
      const database = request.result;
      database.createObjectStore('data');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Slide 2

async function writeDbKey(db, key, value) {
  return new Promise((resolve, reject) => {
    const transaction =
        db.transaction(['data'], 'readwrite', { durability: 'relaxed' });
    const objectStore = transaction.objectStore('data');
    objectStore.put(value, key);
    transaction.commit();
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Slide 3

async function readDbKey(db, key, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['data'], 'readonly');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

(async () => {
  const database = await openIndexedDB('database');
  await writeDbKey(database, 'userid', 'pwnall');
  await writeDbKey(database, 'hello', 'world');
  console.log(await readDbKey(database, 'userid'));
})();
