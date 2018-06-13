const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
    it('should add two numbers', () => {
        const res = utils.add(33, 11);
        // if (typeof (res) !== 'number' || res !== 44) {
        //     throw new Error('does not return the sum of two numbers');
        // }
        expect(res).toBe(44).toBeA('number');
    });

    it('should add two numbers async', (done) => {
        const res = utils.asyncAdd(33, 11, sum => {
            expect(sum).toBe(44).toBeA('number');
            done();
        });
    });

    it('should multiply two numbers', () => {
        const res = utils.square(3);
        // if (typeof (res) !== 'number' || res !== 9) {
        //     throw new Error('does not return the square of a number');
        // }
        expect(res).toBe(9).toBeA('number');
    });

    it('should multiply two numbers', (done) => {
        const res = utils.asyncSquare(3, product => {
            expect(product).toBe(9).toBeA('number');
            done();
        });
    });

})

it('should return a user object with a first and last name', () => {
    const res = utils.setName({}, "Andrew Norton")
    expect(res).toInclude({
        firstName: "Andrew",
        lastName: "Norton"
    });
});