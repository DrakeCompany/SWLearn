/**
 * Created by szaboadam on 2015.01.19..
 */


describe("hello", function() {
    it("Hello World test", function() {
        expect(hello("World")).toBe("Hello World!");
        expect(hello("Adam")).toBe("Hello Adam!");
    });
});

