const crypto = require("crypto");

module.exports = {
    createHash256: function (str) {
        return crypto.createHash('sha512').update(str).digest('hex');
    },

    createHmac512: function (str, key) {
        let hmac = crypto.createHmac("sha512", key);
        return hmac.update(Buffer.from(str, 'uft8')).digest('hex');
    }
}