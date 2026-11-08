# morse-core

ITU Morse encode/decode: letters, digits, punctuation, strict tokens.
Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { encode, decode } from './src/morse.mjs';
encode('SOS');            // '... --- ...'
decode('... --- ...');    // 'SOS'
```

```sh
npm test          # 5 tests, node:test, no dependencies
npm run demo
```

Full-table round-trip pinned. MIT — see `LICENSE`. [Versão em português](README.pt-BR.md).
