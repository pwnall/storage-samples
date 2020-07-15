'use strict';

// Slide 1

async function openFileSystem() {
  return new Promise(webkitRequestFileSystem.bind(self, TEMPORARY, 1048576));
}
async function getFileSystemFileEntry(fs, path, options = {}) {
  return new Promise(fs.root.getFile.bind(fs.root, path, options));
}

async function writeFilePath(fs, path, data) {
  const fileEntry = await getFileSystemFileEntry(fs, path, { create: true });
  const fileWriter = await new Promise(fileEntry.createWriter.bind(fileEntry));
  const blob = new Blob([data], { type: 'application/octet-stream '});
  return new Promise((resolve, reject) => {
    fileWriter.onwriteend = resolve;
    fileWriter.onerror = event => reject(event.target.error);
    fileWriter.write(blob);
  });
}

// Slide 2

async function readFilePath(fs, path) {
  const fileEntry = await getFileSystemFileEntry(fs, path);
  const fileBlob = await new Promise(fileEntry.file.bind(fileEntry));
  return await fileBlob.text();
}

(async () => {
  const fileSystem = await openFileSystem();
  await writeFilePath(fileSystem, 'userid', 'pwnall');
  await writeFilePath(fileSystem, 'hello', 'world');
  console.log(await readFilePath(fileSystem, 'userid'));
})();
