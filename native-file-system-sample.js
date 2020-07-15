'use strict';

async function writeFile(rootDir, name, data) {
  const fileHandle = await rootDir.getFileHandle(name, { create: true });
  const stream = await fileHandle.createWritable();
  await stream.write(new Blob([data], { type: 'application/octet-stream '}));
  await stream.close();
}

async function readFile(rootDir, name) {
  const fileHandle = await rootDir.getFileHandle(name, { create: false });
  return await (await fileHandle.getFile()).text();
}

(async () => {
  const rootDir = await getOriginPrivateDirectory();
  await writeFile(rootDir, 'userid', 'pwnall');
  await writeFile(rootDir, 'hello', 'world');
  console.log(await readFile(rootDir, 'userid'));
})();
