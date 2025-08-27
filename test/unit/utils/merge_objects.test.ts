import { before, describe, it } from 'mocha';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { mergeObjects } from '../../../src/utils/merge_objects';

const temp = mergeObjects;
use(sinonChai);

describe('Utils/mergeObjects', () => {
    it('should merge objects', () => {
        const test = {
            test1: 1,
            test2: 2,
            test3: 3,
            deepTest: {
                test4: 4
            }
        };
        const test2 = {
            test5: 5,
            deepTest: {
                test4: 8,
                test6: 6
            }
        }

        expect(temp(true, test, test2)).to.deep.equal({
            test1: 1,
            test2: 2,
            test3: 3,
            test5: 5,
            deepTest: {
                test4: 8,
                test6: 6
            }
        });
    });

});