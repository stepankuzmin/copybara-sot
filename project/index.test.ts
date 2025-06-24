import test from 'node:test';
import assert from 'node:assert/strict';

import greet from './index.ts';

test('greet', () => {
    assert.strictEqual(greet('World'), 'Hello, World!');
});
