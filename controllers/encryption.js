var CryptoJS = require('crypto-js');

module.exports = {

  encryption: function (encryptionString, keyComponents) {

    var keyHash = getHash(keyComponents);
    var iv = keyHash.slice(0,16);

    var encrypted = CryptoJS.AES.encrypt(encryptionString, keyHash, {iv: iv});

    return encrypted.toString();

  },

  decryption: function (encryptedString, keyComponents) {

    var keyHash = getHash(keyComponents);
    var iv = keyHash.slice(0,16);

    var decrypted = CryptoJS.AES.decrypt(encryptedString, keyHash, {iv: iv});
    console.log(decrypted.toString());

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

};

var getHash = function(keyComponents){
  var DEFAULT_KEY_1 = "c023d51f-8b8b-4025-9c77-268c41acad9c";
  var DEFAULT_KEY_2 = "7f554a7c-b815-4c5b-95c4-e4dcac5cc627";

  var sha512 = CryptoJS.algo.SHA512.create();
  sha512.update(DEFAULT_KEY_1);
  sha512.update(DEFAULT_KEY_2);

  for(var keyComponent in keyComponents) {
    sha512.update(keyComponent);
  }

  var keyHash = sha512.finalize();
  keyHash = keyHash.toString(CryptoJS.enc.Base64);
  // console.log("Hash: " + keyHash);
  return keyHash;
};