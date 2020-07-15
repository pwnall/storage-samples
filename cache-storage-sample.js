'use strict';

async function writeCacheData(cache, key, value) {
  const url = `${self.location.origin}/cached/${key}`;
  await cache.put(url, new Response(value));
}

async function readCacheData(cache, key) {
  const url = `${self.location.origin}/cached/${key}`;
  const response = await cache.match(url);
  return await response.text();
}

(async () => {
  const cache = await caches.open('cache');
  await writeCacheData(cache, 'userid', 'pwnall');
  await writeCacheData(cache, 'hello', 'world');
  console.log(await readCacheData(cache, 'userid'));
})();
