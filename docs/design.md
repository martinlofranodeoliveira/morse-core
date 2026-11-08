# Design — morse-core

One table, two directions: encode maps chars, decode reverses the map
after gap-splitting. Strictness is the feature — prosigns and
non-standard extensions are rejected rather than approximated, so a
decoder never silently invents letters.

Oracle: SOS, full phrases with word gaps, punctuation, and a round-trip
over the entire table. Accented input fails loudly (transliteration is
`slug-core`'s job, not this library's).
