function encrypt(plainText, key, algorithm) {
    let cipherText;
    if (algorithm === "AES") {
        cipherText = CryptoJS.AES.encrypt(plainText, key).toString();
    } else if (algorithm === "DES") {
        cipherText = CryptoJS.DES.encrypt(plainText, key).toString();
    } else if (algorithm === "Blowfish") {
        cipherText = CryptoJS.Blowfish.encrypt(plainText, key).toString();
    }
    return cipherText;
}

function goBack(){
    window.location.href = "../index.html"
}
function decrypt(cipherText, key, algorithm) {
    let plainText;
    if (algorithm === "AES") {
        plainText = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "DES") {
        plainText = CryptoJS.DES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "Blowfish") {
        plainText = CryptoJS.Blowfish.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
    }
    return plainText;
}

function handleEncryption() {
    const plainText = document.getElementById("plainText").value;
    const key = document.getElementById("key").value;
    const algorithm = document.getElementById("algorithm").value;

    const encryptedText = encrypt(plainText, key, algorithm);
    document.getElementById("encryptedText").innerText = `Encrypted: ${encryptedText}`;
    document.getElementById("decryptionResult").innerText = '';
}

function handleDecryption() {
    const cipherText = document.getElementById("encryptedText").innerText.replace("Encrypted: ", "");
    const key = document.getElementById("key").value;
    const algorithm = document.getElementById("algorithm").value;

    const decryptedText = decrypt(cipherText, key, algorithm);
    document.getElementById("decryptionResult").innerText = `Decrypted: ${decryptedText}`;
}