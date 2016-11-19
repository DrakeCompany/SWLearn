/**
 * Created by Sa on 2016.11.18..
 */
// var squere = require('../src/square');

describe('square', function () {
    it('should not modify the original array', function () {
        var tomb =[1,2,3];
        expect(square(tomb)).toEqual([1,4,9]);
        expect(tomb).toEqual([1,2,3]);
    });
    it('well count array', function otherNumber() {
        var tomb =[4,5,6,7];
        expect(square(tomb)).toEqual([16,25,36,49]);

    });
    it('not null', function () {
        var tomb =[4,5,6,7];
        expect(square(tomb)).not.toBe(null);

    });
    it('it null', function () {
        var tomb =[];
        expect(square(tomb)).toEqual([]);

    });

});

// describe

// module.exports=squere;