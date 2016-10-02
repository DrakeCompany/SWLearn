
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(hello("World")).toBe("Hello World!");
        expect(hello("MyName")).toBe("Hello MyName!");
    });
});