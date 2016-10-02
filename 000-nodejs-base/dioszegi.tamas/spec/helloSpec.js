describe("hello world test suite", function() {
    it("prints hello world", function() {
        expect(hello("World")).toBe("Hello World!");
    });
    it("prints hello myname", function() {
        expect(hello("MyName")).toBe("Hello MyName!");
    });
});