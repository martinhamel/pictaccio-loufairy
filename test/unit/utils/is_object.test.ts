import { before, describe, it } from 'mocha';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { isObject } from '../../../src/utils/is_object';

use(sinonChai);

describe('Utils/isObject', () => {
    it('should return true for objects', async () => {
        expect(isObject({})).to.be.equal(true);
        expect(isObject(new Date())).to.be.equal(true);
    });

    it('should not return true for null', async () => {
        expect(isObject(null)).to.be.equal(false);
    });

    it('should return false for non-objects', async () => {
        expect(isObject(1)).to.be.equal(false);
        expect(isObject('string')).to.be.equal(false);
        expect(isObject(1.1)).to.be.equal(false);
    });
});