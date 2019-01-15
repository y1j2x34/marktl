// import { expect } from 'chai';
import { hello } from '../../src';

describe('check that mocha is configured correctly', () => {
    it('hello()', () => {
        hello();
        // expect(hello()).to.be.eq('world');
    })
});
