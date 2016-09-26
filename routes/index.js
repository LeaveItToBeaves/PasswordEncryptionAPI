var express = require('express');
var router = express.Router();
var encryptionController = require('./../controllers/encrpytionController');
var default_route = '/encryptionService/';

/* GET home page. */
router.get(default_route + 'getKeys', function(req, res) {
  encryptionController.getHexKeys(req, res);
});

router.post(default_route + 'encryption', function(req, res) {
  encryptionController.encryptionController(req, res);
});

router.post(default_route + 'decryption', function(req, res) {
  encryptionController.decryptionController(req, res);
});

module.exports = router;
