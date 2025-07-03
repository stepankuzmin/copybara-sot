import test from 'node:test';
import assert from 'node:assert/strict';
import greet from './index.ts';

test('greet', () => {
    assert.strictEqual(greet('Stepan'), 'Greetings, Stepan!');
});

test('greet default value', () => {
    assert.strictEqual(greet(), 'Greetings, Human!');
});
