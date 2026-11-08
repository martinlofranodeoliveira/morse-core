import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode, MorseError } from '../src/morse.mjs';

describe('encode', () => {
  it('encodes SOS, phrases and punctuation', () => {
    assert.equal(encode('SOS'), '... --- ...');
    assert.equal(encode('Hello World'), '.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    assert.equal(encode('Go!'), '--. --- -.-.--');
  });
  it('rejects bad chars, empties and oversize', () => {
    assert.throws(() => encode('Olá'), (e) => e.code === 'BAD_CHAR');
    assert.throws(() => encode(''), (e) => e.code === 'EMPTY');
    assert.throws(() => encode('x'.repeat(2001)), (e) => e.code === 'TOO_LONG');
    assert.throws(() => encode(42), (e) => e.code === 'NOT_STRING');
  });
});

describe('decode', () => {
  it('decodes with word gaps', () => {
    assert.equal(decode('... --- ...'), 'SOS');
    assert.equal(decode('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'), 'HELLO WORLD');
  });
  it('rejects bad symbols, codes and gaps', () => {
    assert.throws(() => decode('... x ...'), (e) => e.code === 'BAD_SYMBOL');
    assert.throws(() => decode('......'), (e) => e.code === 'BAD_CODE');
    assert.throws(() => decode('... // ---'), (e) => e.code === 'BAD_WORD_GAP');
    assert.ok(new MorseError('X') instanceof Error);
  });
});

describe('round-trip', () => {
  it('encode(decode) is stable over the full table', () => {
    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?\'!/()&:;=+-_"$@';
    assert.equal(decode(encode(all)), all);
    assert.equal(encode(decode('... --- ...')), '... --- ...');
  });
});
