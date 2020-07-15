'use strict';

// Slide 1

(async() => {
  const quotaInfo = await navigator.storage.estimate();
  console.log(`Total quota: ${quotaInfo.quota}`);
  console.log(`Used quota: ${quotaInfo.usage}`);
  console.log(quotaInfo.usageDetails);

  const hasPersistentStorage = await navigator.storage.persisted();
  console.log(`Storage is persistent: ${hasPersistentStorage}`);
})();

// Slide 2 - Storage Pressure API Sample

navigator.storage.addEventListener('quotachanged', () => {
  console.log('The system is experiencing storage pressure');
});
