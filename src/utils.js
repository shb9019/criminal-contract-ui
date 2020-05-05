// TODO: Standardize encryption names
export const getEncryptionCode = (enc_type) => {
    switch (enc_type) {
        case "AES-128": {
            return 0;
        }
        case "Caesar": {
            return 1;
        }
        case "Triple-DES": {
            return 2;
        }
        default: {
            return 4;
        }
    }
};

export const getEncryptionName = (enc_code) => {
    console.log(enc_code);
    switch (enc_code) {
        case "0": {
            return "AES-128";
        }
        case "1": {
            return "Caesar";
        }
        case "2": {
            return "Triple-DES";
        }
        default: {
            return 4;
        }
    }
};

export const download = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};
