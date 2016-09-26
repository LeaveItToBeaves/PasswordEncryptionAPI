"use strict";
var CryptoJS = require('crypto-js');
var uuid = require('uuid4');
var encryption = require("./encryption");

module.exports = {
  encryptionController: function(req, res) {
    /**
     * Function will take in request to encrypt password and respond with
     *      encrypted password or respond with error message
     * @param {express.req} req Request object with information sent by the user
     * @param {express.res} res Response object to send result back to user
     */
    var body = req.body;
    if(body.keyComponents == undefined || body.encryptionString == undefined) {
      res.send("incorrect components");
    }
    else {
      var keyComponents = body.keyComponents;
      var encryptionString = body.encryptionString;

      var encrypted = encryption.encryption(encryptionString, keyComponents);
      res.send(encrypted);

    }

  },

  decryptionController: function (req, res) {
    /**
     * Function will take in request to decrypt password and respond with
     *      decrypted password or respond with error message
     * @param {express.req} req Request object with information sent by the user
     * @param {express.res} res Response object to send result back to user
     */
    var body = req.body;
    if(body.keyComponents == undefined || body.encryptionString == undefined) {
      res.send("incorrect components");
    }
    else {
      var keyComponents = body.keyComponents;
      var encryptedString = body.encryptedString;

      var decrypted = encryption.decryption(encryptedString, keyComponents);
      res.send(decrypted);
    }
  },

  getHexKeys: function(req, res) {
    /**
     * Function to generate UUID4 hex keys, up to 2000 at a time
     * @param {express.req} req Request object with information sent by the user
     * @param {express.res} res Response object to send result back to user
     */
    var MAX_KEYS = 2000;
    var query = req.query;
    if (query.numKeys == undefined) {
      res.send("You need to specify numKeys");
    }
    else if(query.numKeys <= MAX_KEYS){
      var keyList = [];
      var numKeys = query.numKeys;

      for (var i = 0; i < numKeys + 1; i++) {
        if (i == numKeys) {
          res.send(keyList);
        }
        else {
          var success = false;

          var id = uuid();
          if (!uuid.valid(id)) {
            if(success){
              res.send("unsuccessful");
            }
            i--;
            success = true;
          }
          else {
            keyList.push(id);
          }
        }
      }
    }
    else{
      res.send("Too many keys");
    }
  }


};