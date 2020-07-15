'use strict';

// Slide 1

async function writeIoFile(name, data) {
  const utf8Bytes = (new TextEncoder()).encode(data);
  const writeBuffer = new Uint8Array(new SharedArrayBuffer(utf8Bytes.length));
  writeBuffer.set(utf8Bytes);

  const file = await nativeIO.open(name);
  await file.write(writeBuffer, 0);
  await file.close();
}

// Slide 2

async function readIoFile(name) {
  const file = await nativeIO.open(name);
  const length = await file.getLength();
  const readBuffer = new Uint8Array(new SharedArrayBuffer(length));
  await file.read(readBuffer, 0);
  await file.close();
  return (new TextDecoder()).decode(Uint8Array.from(readBuffer));
}

(async () => {
  await writeIoFile('userid', 'pwnall');
  await writeIoFile('hello', 'world');
  console.log(await readIoFile('userid'));
})();
