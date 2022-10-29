const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
  createToken: (payload) => {
    const token = jwt.sign(payload, "temporary secret for testing");
    return token;
  },
  // Encrypt
  encryptToken: (token) => {
    // Key to encrypt and decrypt the token
    let mykey = crypto.createCipheriv(
      "aes-128-cbc",
      process.env.CIPHER_PASSWORD,
      process.env.INIT_VECTOR
    );
    // encrypt the token using aes algorithm and Private-Key
    let encrypted_token = mykey.update(token, "utf8", "hex");
    encrypted_token += mykey.final("hex");

    return encrypted_token;
  },
};
