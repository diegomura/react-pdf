# @react-pdf/pdfkit

## 4.1.0

### Minor Changes

- [#3188](https://github.com/diegomura/react-pdf/pull/3188) [`f034491b`](https://github.com/diegomura/react-pdf/commit/f034491b1f77ce6f18a5db88e70b10b9c502ca35) Thanks [@carlobeltrame](https://github.com/carlobeltrame)! - Fix and rework the hyphenation algorithm, and allow custom word hyphenation algorithms to specify whether a hyphen should be inserted in case the word is wrapped.

  **Caution**: If you have been using a custom hyphenation callback - which hasn't been working properly since at least version 2.0.21 - then you will need to change your implementation to leave a soft hyphen character (`'\u00AD'`) at the end of syllables where you want react-pdf to insert a hyphen when wrapping lines. Syllables without a final soft hyphen character will still be able to break, but will not produce a hyphen character at the end of the line.

  This allows you to break correctly on normal hyphens or other special characters in your text. For example, to use the default english-language syllable breaking built into react-pdf, but also break after hyphens naturally occurring in your text (such as is often present in hyperlinks), you could use the following hyphenation callback:

  ```js
  import { Font } from "@react-pdf/renderer";

  Font.registerHyphenationCallback((word, originalHyphenationCallback) => {
    return originalHyphenationCallback(word).flatMap((w) => w.split(/(?<=-)/));
  });
  ```

  (`flatMap` requires at least ES2019)

## 4.0.4

### Patch Changes

- [#2715](https://github.com/diegomura/react-pdf/pull/2715) [`5cbe2fb0`](https://github.com/diegomura/react-pdf/commit/5cbe2fb0bde45c44eb68dde01f20feea245908c6) Thanks [@mgmolisani](https://github.com/mgmolisani)! - Add back functionality for bookmark props

## 4.0.3

### Patch Changes

- [#3118](https://github.com/diegomura/react-pdf/pull/3118) [`106699e8`](https://github.com/diegomura/react-pdf/commit/106699e850dad2285e6999d59975111f217e8a81) Thanks [@diegomura](https://github.com/diegomura)! - feat: compile nullish coalescing operator

## 4.0.2

### Patch Changes

- [#3065](https://github.com/diegomura/react-pdf/pull/3065) [`226467e3`](https://github.com/diegomura/react-pdf/commit/226467e39443d3690b8f8c3298aa8278b43fbfa6) Thanks [@diegomura](https://github.com/diegomura)! - refactor: partially unify pdfkit

## 4.0.1

### Patch Changes

- [#3061](https://github.com/diegomura/react-pdf/pull/3061) [`6d875056`](https://github.com/diegomura/react-pdf/commit/6d875056a07e8479ef695416c1fed575491b6ff1) Thanks [@diegomura](https://github.com/diegomura)! - feat: pdfkit upstream changes

- [#3060](https://github.com/diegomura/react-pdf/pull/3060) [`49daae8f`](https://github.com/diegomura/react-pdf/commit/49daae8fdfba672a3e828847232ee9b70bb51711) Thanks [@diegomura](https://github.com/diegomura)! - feat: enable pdfkit markings mixin

- [#3062](https://github.com/diegomura/react-pdf/pull/3062) [`5cc47319`](https://github.com/diegomura/react-pdf/commit/5cc47319bb428f6d4bcad21cd6dba9afca5cdc17) Thanks [@diegomura](https://github.com/diegomura)! - refactor: unify pdfkit image mixin

- [#3059](https://github.com/diegomura/react-pdf/pull/3059) [`aa0f6725`](https://github.com/diegomura/react-pdf/commit/aa0f672589683a66abc79f838291996ae9aaffb8) Thanks [@diegomura](https://github.com/diegomura)! - feat: add pdfkit subsets mixin

## 4.0.0

### Major Changes

- [#2871](https://github.com/diegomura/react-pdf/pull/2871) [`70f29a04`](https://github.com/diegomura/react-pdf/commit/70f29a0407b1d56e9a7932b25c0d69132e9b4119) Thanks [@diegomura](https://github.com/diegomura)! - feat!: drop cjs support

### Patch Changes

- [#2877](https://github.com/diegomura/react-pdf/pull/2877) [`fdcef566`](https://github.com/diegomura/react-pdf/commit/fdcef5666e4eeed542b625d394cdfe60d6346600) Thanks [@Friendseeker](https://github.com/Friendseeker)! - chore: bump jay-peg

- Updated dependencies [[`70f29a04`](https://github.com/diegomura/react-pdf/commit/70f29a0407b1d56e9a7932b25c0d69132e9b4119)]:
  - @react-pdf/png-js@3.0.0

## 3.2.0

### Minor Changes

- [#2771](https://github.com/diegomura/react-pdf/pull/2771) [`8e6a832`](https://github.com/diegomura/react-pdf/commit/8e6a8320f86354aff950c296a96bc41a33e9dab2) Thanks [@nikischin](https://github.com/nikischin)! - fix: fix dpi

## 3.1.10

### Patch Changes

- [#2721](https://github.com/diegomura/react-pdf/pull/2721) [`713690c`](https://github.com/diegomura/react-pdf/commit/713690cca266116bb7e80d13cf84bc843f9dfd52) Thanks [@cfhull](https://github.com/cfhull)! - fix: support values of `0` in stroke-dasharray

## 3.1.9

### Patch Changes

- [#2689](https://github.com/diegomura/react-pdf/pull/2689) [`e2d21a4`](https://github.com/diegomura/react-pdf/commit/e2d21a433b881bb96ea4d0b3a01a7297dd1f4a94) Thanks [@joelybahh](https://github.com/joelybahh)! - fix: jpeg precision metadata

## 3.1.8

### Patch Changes

- [#2687](https://github.com/diegomura/react-pdf/pull/2687) [`68bfc57`](https://github.com/diegomura/react-pdf/commit/68bfc575adfb95302e320019715d1eec5398259f) Thanks [@diegomura](https://github.com/diegomura)! - chore: bump jay-peg

## 3.1.7

### Patch Changes

- [#2635](https://github.com/diegomura/react-pdf/pull/2635) [`da10a9b`](https://github.com/diegomura/react-pdf/commit/da10a9bb43dc4c4765687850444a24cbc4eb402a) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - fix: bump jay-peg dependency to fix CJS module resolution error

## 3.1.6

### Patch Changes

- [#2610](https://github.com/diegomura/react-pdf/pull/2610) [`dc54c13`](https://github.com/diegomura/react-pdf/commit/dc54c13625510482e93f80ed5cc07cf3a6a6d34c) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - fix: fix CJS compatibility

## 3.1.5

### Patch Changes

- Updated dependencies [[`f7505ed`](https://github.com/diegomura/react-pdf/commit/f7505ed453a1a0ae960d0e5e4a1d155803861b71)]:
  - @react-pdf/png-js@2.3.1

## 3.1.4

### Patch Changes

- [#2600](https://github.com/diegomura/react-pdf/pull/2600) [`8350154`](https://github.com/diegomura/react-pdf/commit/83501541e3a050021e18e112bb472b2dabc142a7) Thanks [@diegomura](https://github.com/diegomura)! - feat: bidi support

## 3.1.3

### Patch Changes

- [`0590324`](https://github.com/diegomura/react-pdf/commit/0590324d7a6d75c0a49520b3f99cfb6594239390) Thanks [@diegomura](https://github.com/diegomura)! - fix: replace jpeg-exif with jay-peg

## 3.1.2

### Patch Changes

- [#2549](https://github.com/diegomura/react-pdf/pull/2549) [`44bd45b`](https://github.com/diegomura/react-pdf/commit/44bd45b1961ca8bae4a2f84cc77db945e5c43419) Thanks [@carlobeltrame](https://github.com/carlobeltrame)! - Fix named destinations (id attribute with string value)

## 3.1.1

### Patch Changes

- [#2532](https://github.com/diegomura/react-pdf/pull/2532) [`36c6ba3`](https://github.com/diegomura/react-pdf/commit/36c6ba30ae73a512f19fe5bc47ac8c304887c0da) Thanks [@diegomura](https://github.com/diegomura)! - refactor: converge pdfkit

* [#2529](https://github.com/diegomura/react-pdf/pull/2529) [`a35b1ba`](https://github.com/diegomura/react-pdf/commit/a35b1ba18d293df51293600d8d56015094d222d8) Thanks [@diegomura](https://github.com/diegomura)! - fix: jpeg exif orientation rendering

## 3.1.0

### Minor Changes

- [#2409](https://github.com/diegomura/react-pdf/pull/2409) [`b6a14fd`](https://github.com/diegomura/react-pdf/commit/b6a14fd160fab26a49f798e5294b0e361e67fe37) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Add support for native ESM

### Patch Changes

- Updated dependencies [[`b6a14fd`](https://github.com/diegomura/react-pdf/commit/b6a14fd160fab26a49f798e5294b0e361e67fe37)]:
  - @react-pdf/png-js@2.3.0

## 3.0.4

### Patch Changes

- [#2479](https://github.com/diegomura/react-pdf/pull/2479) [`45b2bd3`](https://github.com/diegomura/react-pdf/commit/45b2bd37037c605727ad5783f2f2a438dc19cac4) Thanks [@diegomura](https://github.com/diegomura)! - fix linting

* [#2488](https://github.com/diegomura/react-pdf/pull/2488) [`b457a0c`](https://github.com/diegomura/react-pdf/commit/b457a0cc1c1352325e6c633af3000a3c9241f7f7) Thanks [@diegomura](https://github.com/diegomura)! - fix: copy-paste for registered font

## 3.0.3

### Patch Changes

- [#2450](https://github.com/diegomura/react-pdf/pull/2450) [`4cfb84d`](https://github.com/diegomura/react-pdf/commit/4cfb84d9f3d2301720b68b4c40a0257b9520c6e1) Thanks [@strazto](https://github.com/strazto)! - build: update crypto-js from 4.0.0 -> 4.2.0 (CVE-2023-46233)

## 3.0.2

### Patch Changes

- [#2205](https://github.com/diegomura/react-pdf/pull/2205) [`9a5e0be`](https://github.com/diegomura/react-pdf/commit/9a5e0befb89756db07ce053192a136df9d4ba905) Thanks [@jeetiss](https://github.com/jeetiss)! - update babel

## 3.0.1

### Patch Changes

- [#2121](https://github.com/diegomura/react-pdf/pull/2121) [`8536f10`](https://github.com/diegomura/react-pdf/commit/8536f103830a9ed00211fc4c821b221377885a07) Thanks [@jeetiss](https://github.com/jeetiss)! - fix `attachments` mixin

## 3.0.0

### Major Changes

- [#1891](https://github.com/diegomura/react-pdf/pull/1891) [`a5a933c`](https://github.com/diegomura/react-pdf/commit/a5a933c9733e4c77338ef76a2b3545b84a646a81) Thanks [@carlobeltrame](https://github.com/carlobeltrame)! - feat: compatibility with modern web bundlers and browsers

### Patch Changes

- [#1941](https://github.com/diegomura/react-pdf/pull/1941) [`001a208`](https://github.com/diegomura/react-pdf/commit/001a20812fa039d09931b22eb97a8869e3b31cc5) Thanks [@PhilippMeissner](https://github.com/PhilippMeissner)! - chore: adds missing licenses to package.json

* [#1908](https://github.com/diegomura/react-pdf/pull/1908) [`d1f3d5b`](https://github.com/diegomura/react-pdf/commit/d1f3d5b9b4103705e95e2160347ee253d842ed5d) Thanks [@diegomura](https://github.com/diegomura)! - chore: use fontkit mainline repo + drop node 12

- [#1929](https://github.com/diegomura/react-pdf/pull/1929) [`9996158`](https://github.com/diegomura/react-pdf/commit/9996158636edf2118c4a6dcce08a00408b982993) Thanks [@diegomura](https://github.com/diegomura)! - feat: remove blob stream dependency

- Updated dependencies [[`a5a933c`](https://github.com/diegomura/react-pdf/commit/a5a933c9733e4c77338ef76a2b3545b84a646a81), [`001a208`](https://github.com/diegomura/react-pdf/commit/001a20812fa039d09931b22eb97a8869e3b31cc5)]:
  - @react-pdf/png-js@2.2.0

## 2.4.0

### Minor Changes

- [#1892](https://github.com/diegomura/react-pdf/pull/1892) [`035d3f8`](https://github.com/diegomura/react-pdf/commit/035d3f8d24fa4f4af9f350950d81b51547858367) Thanks [@diegomura](https://github.com/diegomura)! - feat: add skew transformation support

### Patch Changes

- [#1894](https://github.com/diegomura/react-pdf/pull/1894) [`9527fe4`](https://github.com/diegomura/react-pdf/commit/9527fe4c9087818421eca4753172b06e3c0cb934) Thanks [@diegomura](https://github.com/diegomura)! - feat: generate document ID

- Updated dependencies [[`0fcc594`](https://github.com/diegomura/react-pdf/commit/0fcc594310d5af30ca1e752b3efc7a047e813dcb)]:
  - @react-pdf/fontkit@2.1.2

## 2.3.0

### Minor Changes

- [#1862](https://github.com/diegomura/react-pdf/pull/1862) [`1411d16`](https://github.com/diegomura/react-pdf/commit/1411d162e04ca237bad93729695c363fdf4bdbeb) Thanks [@diegomura](https://github.com/diegomura)! - feat: bookmarks support

* [#1867](https://github.com/diegomura/react-pdf/pull/1867) [`4fadb48`](https://github.com/diegomura/react-pdf/commit/4fadb48983d7269452f89f80c7e341ece859aaee) Thanks [@diegomura](https://github.com/diegomura)! - feat: add page layout support

- [#1857](https://github.com/diegomura/react-pdf/pull/1857) [`d958b0a`](https://github.com/diegomura/react-pdf/commit/d958b0ae06a61c157b2581488a9121a0464222f4) Thanks [@diegomura](https://github.com/diegomura)! - feat: embed same image once in final document

* [#1868](https://github.com/diegomura/react-pdf/pull/1868) [`ce8762f`](https://github.com/diegomura/react-pdf/commit/ce8762f6de5c796e69ec5a225c7f3ff9c619a960) Thanks [@diegomura](https://github.com/diegomura)! - feat: add page mode support

- [#1869](https://github.com/diegomura/react-pdf/pull/1869) [`5d2c308`](https://github.com/diegomura/react-pdf/commit/5d2c3088cf438a8abf1038b14a21117fecf59d57) Thanks [@diegomura](https://github.com/diegomura)! - feat: variable dpi

### Patch Changes

- [#1865](https://github.com/diegomura/react-pdf/pull/1865) [`24f5c77`](https://github.com/diegomura/react-pdf/commit/24f5c77706e12dbab45053cb704a2fe7cf60eb53) Thanks [@diegomura](https://github.com/diegomura)! - feat: add background color and border with Note support

- Updated dependencies [[`89b8059`](https://github.com/diegomura/react-pdf/commit/89b8059185f917531a56b3424223e8656ffed8f7)]:
  - @react-pdf/fontkit@2.1.1

## 2.2.0

### Minor Changes

- [#1841](https://github.com/diegomura/react-pdf/pull/1841) [`25a80eb`](https://github.com/diegomura/react-pdf/commit/25a80ebd5f96ade7101883624010bad51474967c) Thanks [@diegomura](https://github.com/diegomura)! - feat: support bold-italic standard fonts

## 2.1.0

### Minor Changes

- [#1610](https://github.com/diegomura/react-pdf/pull/1610) [`4c5d527`](https://github.com/diegomura/react-pdf/commit/4c5d52721d29d843f1d09c3fd74370832429f70e) Thanks [@jeetiss](https://github.com/jeetiss)! - updated rollup rollup-plugins and babel

* [#1654](https://github.com/diegomura/react-pdf/pull/1654) [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b) Thanks [@jeetiss](https://github.com/jeetiss)! - added `@babel/runtime` to dependencies

### Patch Changes

- [#1673](https://github.com/diegomura/react-pdf/pull/1673) [`d341ae6`](https://github.com/diegomura/react-pdf/commit/d341ae66e91774e95e82deb8d9162bf458688768) Thanks [@jeetiss](https://github.com/jeetiss)! - ingore fs package in browser bundle

* [#1581](https://github.com/diegomura/react-pdf/pull/1581) [`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca) Thanks [@jeetiss](https://github.com/jeetiss)! - added changelog with changesets

- [#1607](https://github.com/diegomura/react-pdf/pull/1607) [`a592e99`](https://github.com/diegomura/react-pdf/commit/a592e99f7df7481697582c2a12f31ce7f9559c66) Thanks [@jeetiss](https://github.com/jeetiss)! - replaced `crypto-js` with `crypto-js/md5` to reduce bundle size

- Updated dependencies [[`3217a89`](https://github.com/diegomura/react-pdf/commit/3217a892e92ff98e92b6c7ea6e3244d403f679b6), [`4c5d527`](https://github.com/diegomura/react-pdf/commit/4c5d52721d29d843f1d09c3fd74370832429f70e), [`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca), [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b)]:
  - @react-pdf/fontkit@2.1.0
  - @react-pdf/png-js@2.1.0
