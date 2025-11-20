
// Polyfill for global.crypto in Node.js environment
if (typeof global.crypto === 'undefined') {
  // Node's built-in crypto module
  const nodeCrypto = require('crypto');

  // Expose something compatible with what cucumber/messages expects
  global.crypto = {
    // for code that does crypto.randomUUID()
    randomUUID: nodeCrypto.randomUUID
      ? () => nodeCrypto.randomUUID()
      : () => nodeCrypto.randomBytes(16).toString('hex'),

    // for code that does crypto.getRandomValues()
    getRandomValues: (typedArray) => {
      const buffer = nodeCrypto.randomBytes(typedArray.length);
      for (let i = 0; i < typedArray.length; i++) {
        typedArray[i] = buffer[i];
      }
      return typedArray;
    },
  };
}
