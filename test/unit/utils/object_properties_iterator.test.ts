import { before, describe, it } from 'mocha';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { objectPropertiesIterator } from '../../../src/utils/object_properties_iterator';

use(sinonChai);

describe('Utils/objectPropertiesIterator', () => {
    it('should iterate over an object properties', () => {
        const test = {
            test1: 1,
            test2: 2,
            test3: 3
        };

        for (let prop of objectPropertiesIterator(test)) {
            expect(Object.keys(test)).to.include(prop);
        }
    });

    it('should allow to filter the iterated properties with a RegExp', () => {
        const test = {
            test1: 1,
            test2: 2,
            test3: 3,
            testUnwanted: 4
        };

        for (let prop of objectPropertiesIterator(test, /\d/)) {
            expect(prop).to.not.include('Unwanted');
        }
    });
});