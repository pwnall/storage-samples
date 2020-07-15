'use strict';

// Slide 1 - Blobs API Sample

function createBlob(data) {
  return new Blob([data], { type: 'application/octet-stream '});
}

async function readBlob(blob) {
  return await blob.text();
}

(async () => {
  const userIdBlob = createBlob('pwnall');
  const helloBlob = createBlob('world');
  console.log(await readBlob(userIdBlob));
})();

// Slide 2 -  Blob URLs API Sample

// The URL lives as long as the document.
// URLs look like blob:https://example.com/0c7339b0-c1df-4a36-81fc-7dd26ee4179a
//
// Please use Service Workers instead.
function createBlobUrl(data) {
  const blob = new Blob([data], { type: 'application/octet-stream '});
  return URL.createObjectURL(blob);
}

(async () => {
  const helloBlobUrl = createBlobUrl('world');
  console.log(await (await fetch(helloBlobUrl)).text());
})();
