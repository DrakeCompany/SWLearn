/**
 * Created by Sa on 2016.11.18..
 */
// var isPrime =require('../src/isPrime');


describe('isPrime', function () {
    it('should work with 42', function () {  expect(isPrime(42)).toBeFalsy();    });
    it('should work with 19', function () {  expect(isPrime(19)).toBeTruthy();    });
    it('should work with 0', function () {  expect(isPrime(0)).toBeFalsy();    });
    it('should work with 1', function () {  expect(isPrime(1)).toBe(false);    });
});
 // module.exports = isPrime;