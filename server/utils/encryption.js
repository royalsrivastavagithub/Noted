const CryptoJS = require("crypto-js");

const secretKey = process.env.ENCRYPTION_SECRET || "test";

// Encrypt text
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decrypt text
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
