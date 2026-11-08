# Contract — morse-core

Pure ESM in `src/morse.mjs`, zero runtime dependencies, Node >= 22.
ITU table: A-Z, 0-9 and 18 punctuation marks. Case-insensitive input,
uppercase output.

| Export | Result |
| --- | --- |
| `MAX_INPUT` (2000 chars) | Hard bound (morse side capped at 8×). |
| `encode(text)` | Letters space-joined, words ` / `-joined. |
| `decode(morse)` | Strict tokens; `/` restores spaces. |

Errors: `NOT_STRING` · `EMPTY` · `TOO_LONG` · `BAD_CHAR` ·
`BAD_SYMBOL` · `BAD_CODE` · `BAD_WORD_GAP`.
Unknown letters fail (`Olá` → `BAD_CHAR`); unknown dot-dash tokens
fail (`BAD_CODE`). No timing model, no audio.
