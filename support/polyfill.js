if (typeof global.crypto === 'undefined') {
  const nodeCrypto = require('crypto');

  global.crypto = {
    randomUUID: nodeCrypto.randomUUID
      ? () => nodeCrypto.randomUUID()
      : () => nodeCrypto.randomBytes(16).toString('hex'),

    getRandomValues: (typedArray) => {
      const buffer = nodeCrypto.randomBytes(typedArray.length);
      typedArray.set(buffer);
      return typedArray;
    }
  };
}
