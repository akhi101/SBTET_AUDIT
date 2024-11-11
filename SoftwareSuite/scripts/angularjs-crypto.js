angular.module('angularjs-crypto', [])
    .provider('$crypto', function CryptoKeyProvider() {
        var cryptoKey;

        this.setCryptographyKey = function (value) {
            cryptoKey = value;
        };

        this.$get = [function () {
            return {
                getCryptoKey: function () {
                    return cryptoKey
                },

                setCryptographyKey: function (value) {
                    cryptoKey = value;
                },

                encrypt: function (msg, pass) {
                    // random salt for derivation
                    var keySize = 256;
                    var salt = CryptoJS.lib.WordArray.random(16);
                    // well known algorithm to generate key
                    var key = CryptoJS.PBKDF2(pass, salt, {
                        keySize: keySize / 32,
                        iterations: 100
                    });
                    // random IV
                    var iv = CryptoJS.lib.WordArray.random(128 / 8);
                    // specify everything explicitly
                    var encrypted = CryptoJS.AES.encrypt(msg, key, {
                        iv: iv,
                        padding: CryptoJS.pad.Pkcs7,
                        mode: CryptoJS.mode.CBC
                    });
                    // combine everything together in base64 string
                    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
                    return result;
                },

                decrypt: function (message, key) {

                    if (key === undefined) {
                        key = cryptoKey;
                    }

                    return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)
                }
            }
        }];
    });