describe('Hooks', () => {
    it('Should be true, simulate test pass', () => {
        const foo = true;
        expect(foo).toBe(true);
    })
    it('Should be false, simulate test fail', () => {
        const foo = true;
        expect(foo).toBe(false)
    })
});
