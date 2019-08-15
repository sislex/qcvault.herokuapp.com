const script = {
    url: 'https://qcvault.herokuapp.com/unlock_safe',
    success: (params, responseText) => { // Congratulation, you found the code.<br>Please send us the following quote along with your source code.<br>"If brute force does not solve your problems, then you are not using enough."
        const paramsObj = JSON.parse(params);
        const key = `${paramsObj.first} ${paramsObj.second} ${paramsObj.third}`;

        return {key, responseText};
    },
    send: (params) => {
        return new Promise((resolve, reject) => {
            const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', script.url);
            xmlHttp.setRequestHeader("Accept", "*/*");
            xmlHttp.setRequestHeader("Accept-Language", "ru-RU,ru;q=0.9,be-BY;q=0.8,be;q=0.7,en-US;q=0.6,en;q=0.5");
            xmlHttp.setRequestHeader("Cache-Control", "no-cache");
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(params);
            xmlHttp.onload = () => {
                if (xmlHttp.responseText !== 'Wrong code') {
                    const success = script.success(params, xmlHttp.responseText);
                    resolve(success);
                }
            };

            xmlHttp.onerror = () => { // only triggers if the request couldn't be made at all
                // console.log(`Network Error`);
            };
        });
    },
    getCodeList: () => {
        const codeList = [];
        for(let first = 0; first <= 9; first++) {
            for(let second = 0; second <= 9; second++) {
                for(let third = 0; third <= 9; third++) {
                    const params = JSON.stringify({ first, second, third });
                    codeList.push(params);
                }
            }
        }

        return codeList;
    },
    init: () => {
        return new Promise((resolve, reject) => {
            const codeList = script.getCodeList();
            codeList.forEach((params) => {
                script.send(params).then(result => {
                    resolve(result);
                });
            });
        });

    }
};
module.exports = script;
