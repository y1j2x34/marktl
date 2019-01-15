import { expect } from 'chai';
import { hello } from '../../src';

describe('check that karma is configured correctly', () => {
    it('hello()', () => {
        expect(hello()).to.be.eq('world');
    })
});
