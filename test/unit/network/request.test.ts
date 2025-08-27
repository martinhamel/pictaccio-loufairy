import { before, describe, it } from 'mocha';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { request } from '../../../src/network/request';
import { Headers } from 'node-fetch';

use(sinonChai);

const testObject = {
    test1: 'test',
    test2: 4,
    test3: true
};

describe('Network/request', () => {
});