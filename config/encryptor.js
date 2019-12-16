module.exports = require('simple-encryptor')({
  key: process.env.ENCRYPTION_KEY,
  hmac: false
})