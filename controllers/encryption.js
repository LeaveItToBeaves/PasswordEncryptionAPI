"use strict";
var CryptoJS = require('crypto-js');
var keysJson = require('../keys.json');

module.exports = {

  encryption: function (encryptionString, keyComponents) {
    /**
     * @param {string} encryptionString Password value to be encrypted
     * @param {Array} keyComponents Array of key components to be used for
     *      encryption
     * @return {string} returns encrypted string
     */

    var keyHash = getHash(keyComponents);
    var iv = keyHash.slice(0,16);

    var encrypted = CryptoJS.AES.encrypt(encryptionString, keyHash, {iv: iv});

    return encrypted.toString();

  },

  decryption: function (encryptedString, keyComponents) {
    /**
     * @param {string} encryptedString Encrypted password value to be decrypted
     * @param {Array} keyComponents Array of key components to be used for
     *      decryption
     * @return {string} returns decrypted string
     */

    var keyHash = getHash(keyComponents);
    var iv = keyHash.slice(0,16);

    var decrypted = CryptoJS.AES.decrypt(encryptedString, keyHash, {iv: iv});

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

};

var getHash = function(keyComponents){
  /**
   * @param {Array} keyComponents The key components provided by the user
   *
   * @return {string} returns a hash to be used for encryption and decrpytion
   */
  var sha512 = CryptoJS.algo.SHA512.create();

  for(var key of keyComponents) {
    sha512.update(key);
  }

  var jsonKeys = getJsonKeys(keyComponents);
  for(var jsonKey of jsonKeys){
    sha512.update(jsonKey);
  }


  var keyHash = sha512.finalize();
  keyHash = keyHash.toString(CryptoJS.enc.Base64);
  return keyHash;
};

var getJsonKeys = function (keyComponents) {
  /**
   * This function selects the keys from the keys.json file that should be used
   *       for encryption/decryption
   * @param {Array} keyComponents This is a param that should be the
   *      key components provided by the user
   * @return {Array} returns Array of components selected from keys.json
   */
  var keyArray = [];
  var MAX_NUM_KEYS = keysJson.keyComponents.length;
  var EXPONENT = 3;

  for(var key of keyComponents){
    var jsonIndex = 1;
    for(var char of key){
      var num = parseInt(char);
      if(!isNaN(num)){
        jsonIndex += parseInt(char);
      }
    }
    var index = Math.pow(jsonIndex, EXPONENT) % MAX_NUM_KEYS;
    keyArray.push(keysJson.keyComponents[index]);
  }

  return keyArray;
};