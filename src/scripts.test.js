const script = require('./scripts');

describe('Test for right data', () => {
    it('should toBeTruthy', () => {
        expect(script).toBeTruthy();
    });
    it('url should be https://qcvault.herokuapp.com/unlock_safe', () => {
        expect(script.url).toBe('https://qcvault.herokuapp.com/unlock_safe');
    });
    it('getCodeList should return have array with 1000 items', () => {
        expect(script.getCodeList().length).toBe(1000);
    });
    it('item should have property first, second, third properties', () => {
        const item = script.getCodeList()[999];
        const paramsObj = JSON.parse(item);
        let result = paramsObj.first && paramsObj.second && paramsObj.third;

        expect(result).toBeTruthy();
    });
    it('have init function', () => {
        expect(script.init).toBeInstanceOf( Function )
    });
});

describe('Test response', () => {
    it('should have success response', () => {
        expect.assertions(1);
        return script.init().then((result) => {
            expect(result.responseText).toEqual('Congratulation, you found the code.<br>Please send us the following quote along with your source code.<br>"If brute force does not solve your problems, then you are not using enough."')
        });
    }, 15000);

});
