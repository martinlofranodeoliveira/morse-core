// SPDX-License-Identifier: MIT
// ITU Morse encode/decode: A-Z 0-9 and standard punctuation. Letters
// space-separated, words '/'-separated. Strict: unknown tokens fail.
// No network, no I/O.

export const MAX_INPUT = 2000;

export class MorseError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'MorseError';
    this.code = code;
  }
}

const TABLE = Object.freeze({
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
  5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', _: '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.',
});

const REVERSE = Object.freeze(Object.fromEntries(Object.entries(TABLE).map(([k, v]) => [v, k])));

/** Text -> morse. Letters uppercase; words split on whitespace, joined by ' / '. */
export function encode(input) {
  if (typeof input !== 'string') throw new MorseError('NOT_STRING');
  if (input.length === 0) throw new MorseError('EMPTY');
  if (input.length > MAX_INPUT) throw new MorseError('TOO_LONG');
  const words = input.trim().split(/\s+/);
  return words.map((w) => {
    const letters = [...w.toUpperCase()].map((ch) => {
      const code = TABLE[ch];
      if (!code) throw new MorseError('BAD_CHAR', ch);
      return code;
    });
    if (letters.length === 0) throw new MorseError('EMPTY');
    return letters.join(' ');
  }).join(' / ');
}

/** Morse -> text. Strict tokens; '/' restores word spaces. */
export function decode(input) {
  if (typeof input !== 'string') throw new MorseError('NOT_STRING');
  const t = input.trim();
  if (t.length === 0) throw new MorseError('EMPTY');
  if (t.length > MAX_INPUT * 8) throw new MorseError('TOO_LONG');
  if (/[^.\-/\s]/.test(t)) throw new MorseError('BAD_SYMBOL');
  return t.split(/\s*\/\s*/).map((word) => {
    if (!word) throw new MorseError('BAD_WORD_GAP');
    return [...word.split(/\s+/)].map((tok) => {
      const ch = REVERSE[tok];
      if (!ch) throw new MorseError('BAD_CODE', tok.slice(0, 12));
      return ch;
    }).join('');
  }).join(' ');
}
