#!/usr/bin/env node
// Demo: fixed conversions, asserts exact output. --assert exits non-zero on mismatch.
import { encode, decode } from '../src/morse.mjs';

const CASES = [
  ['SOS', '... --- ...'],
  ['HELLO WORLD', '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'],
];

let failed = 0;
for (const [plain, code] of CASES) {
  const got = encode(plain);
  const back = decode(code);
  const pass = got === code && back === plain;
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${plain} <-> ${got}`);
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
