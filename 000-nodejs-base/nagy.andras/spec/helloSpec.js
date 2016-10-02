/**
 * Created by Bandi on 2015.01.24..
 */

describe("Szevasz tavasz", function() {
    it("Teszteljük a szevasz tavaszt", function() {
        expect(szevasz("tavasz")).toBe("Szevasz tavasz!");
        expect(szevasz("Bandi")).toBe("Szevasz Bandi!");
    });
});
