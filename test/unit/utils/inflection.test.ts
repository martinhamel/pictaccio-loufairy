import { describe, it } from 'mocha';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { camelize, dasherize, underscorize } from '../../../src/utils/inflection';

use(sinonChai);

describe('Utils/inflection/camelize', () => {
    it('should remove each non-letter characters and output a camelCase string', () => {
        const tests = [
            / 'Hello world',
            / 'Hello World',
            / 'Hello-my-World',
            / 'Hello_my-World',
            'Hello 1',
            'hello12',
            '12hello',
            'hello 123 world'
        ];

        const results = []

        for (let i = 0, length = tests.length; i < length; ++i) {
            results[i] = camelize(tests[i], true);
        }

        expect(results).to.deep.equal([
            / 'helloWorld',
            / 'helloWorld',
            / 'helloMyWorld',
            / 'helloMyWorld',
            'hello1',
            'hello12',
            '12Hello',
            'hello123World'
        ]);
    });

    it('should remove each non-letter characters and output a PascalCase string', () => {
        const tests = [
            'Hello world',
            'Hello World',
            'Hello-my-World',
            'Hello_my-World'
        ];

        const results = []

        for (let i = 0, length = tests.length; i < length; ++i) {
            results[i] = camelize(tests[i], false);
        }

        expect(results).to.deep.equal([
            'HelloWorld',
            'HelloWorld',
            'HelloMyWorld',
            'HelloMyWorld']);
    });
});

describe('Utils/inflection/dasherize', () => {
    it('should remove each non-letter characters and output a dash-separated string', () => {
        const tests = [
            'Hello world',
            'Hello World',
            'hello-my-World',
            'Hello_my-World',
            'helloWorld',
            'HelloMyWorld',
            'helloMyBootyfullWorld'
        ];

        const results = []

        for (let i = 0, length = tests.length; i < length; ++i) {
            results[i] = dasherize(tests[i]);
        }

        expect(results).to.deep.equal([
            'hello-world',
            'hello-world',
            'hello-my-world',
            'hello-my-world',
            'hello-world',
            'hello-my-world',
            'hello-my-bootyfull-world'
        ]);
    });
});

describe('Utils/inflection/underscorize', () => {
    it('should remove each non-letter characters and output a underscore-separated string', () => {
        const tests = [
            'Hello world',
            'Hello World',
            'hello-my-World',
            'Hello_my-World',
            'helloWorld',
            'HelloMyWorld',
            'helloMyBootyfullWorld'
        ];

        const results = []

        for (let i = 0, length = tests.length; i < length; ++i) {
            results[i] = underscorize(tests[i]);
        }

        expect(results).to.deep.equal([
            'hello_world',
            'hello_world',
            'hello_my_world',
            'hello_my_world',
            'hello_world',
            'hello_my_world',
            'hello_my_bootyfull_world'
        ]);
    });
});