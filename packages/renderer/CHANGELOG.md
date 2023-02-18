# @react-pdf/renderer

## 3.1.5

### Patch Changes

- [#2202](https://github.com/diegomura/react-pdf/pull/2202) [`f4d2b68`](https://github.com/diegomura/react-pdf/commit/f4d2b68765d146e4718140f65eeceb7e69e2cfee) Thanks [@jeetiss](https://github.com/jeetiss)! - add `events` as dependency to fix build in vite

* [#2201](https://github.com/diegomura/react-pdf/pull/2201) [`75150ca`](https://github.com/diegomura/react-pdf/commit/75150ca137b709fcab6e7cefee9dfac6b48d5aaa) Thanks [@jeetiss](https://github.com/jeetiss)! - Reveal layout data in `onRender` callback

  This is an experimental API, and it will change in the future. Use it at your own risk

## 3.1.4

### Patch Changes

- Updated dependencies [[`c981784`](https://github.com/diegomura/react-pdf/commit/c981784b172e9a7631edb7a1fe41ce77bc6ccdee)]:
  - @react-pdf/layout@3.4.0

## 3.1.3

### Patch Changes

- [#2173](https://github.com/diegomura/react-pdf/pull/2173) [`18cb161`](https://github.com/diegomura/react-pdf/commit/18cb161e3a40581e79b4d3ee0410cb2c3472e987) Thanks [@jeetiss](https://github.com/jeetiss)! - export renderToBuffer type

* [#2172](https://github.com/diegomura/react-pdf/pull/2172) [`d0cc0bd`](https://github.com/diegomura/react-pdf/commit/d0cc0bd26f04731e1009fae15860892d04e5222f) Thanks [@rdennis](https://github.com/rdennis)! - Improved `children` prop types for react@18.

## 3.1.2

### Patch Changes

- [#2170](https://github.com/diegomura/react-pdf/pull/2170) [`b06f8f4`](https://github.com/diegomura/react-pdf/commit/b06f8f4e2ac8490b75093e05bfdc9a7be5594936) Thanks [@jeetiss](https://github.com/jeetiss)! - fix both esm and commonjs entries

## 3.1.1

### Patch Changes

- [#2161](https://github.com/diegomura/react-pdf/pull/2161) [`f648581`](https://github.com/diegomura/react-pdf/commit/f6485813c987f09a3aabca505fd0f6239ca5e58d) Thanks [@jeetiss](https://github.com/jeetiss)! - fix esm reexports

## 3.1.0

### Minor Changes

- [#2140](https://github.com/diegomura/react-pdf/pull/2140) [`327f071`](https://github.com/diegomura/react-pdf/commit/327f071ea72a7abb22423009666ddf06838a0654) Thanks [@jeetiss](https://github.com/jeetiss)! - fix react peer dependency problem

* [#2160](https://github.com/diegomura/react-pdf/pull/2160) [`a743c90`](https://github.com/diegomura/react-pdf/commit/a743c905fb5d201d2382bc9175fa36b83cc47284) Thanks [@jeetiss](https://github.com/jeetiss)! - implement flex gap

### Patch Changes

- [#2158](https://github.com/diegomura/react-pdf/pull/2158) [`2343a99`](https://github.com/diegomura/react-pdf/commit/2343a9982c647b0c6684df911d001120ed55596b) Thanks [@jeetiss](https://github.com/jeetiss)! - add type definition for renderToBuffer method

* [#2149](https://github.com/diegomura/react-pdf/pull/2149) [`54e9625`](https://github.com/diegomura/react-pdf/commit/54e962505a9917b20b2a3ffe8508a36a6bbc4f30) Thanks [@jeetiss](https://github.com/jeetiss)! - Fix "Invalid" error when a text label is a child of a Tspan element

- [#1798](https://github.com/diegomura/react-pdf/pull/1798) [`17a8006`](https://github.com/diegomura/react-pdf/commit/17a80066453454dce6141f7da2033d348b4d53c8) Thanks [@karlhorky](https://github.com/karlhorky)! - fix types for @types/react@18

- Updated dependencies [[`a743c90`](https://github.com/diegomura/react-pdf/commit/a743c905fb5d201d2382bc9175fa36b83cc47284)]:
  - @react-pdf/layout@3.3.0
  - @react-pdf/types@2.2.0

## 3.0.3

### Patch Changes

- [#2146](https://github.com/diegomura/react-pdf/pull/2146) [`2b05ef7`](https://github.com/diegomura/react-pdf/commit/2b05ef784b4ccf08dd06a91c4a6f054bddfaf5db) Thanks [@jeetiss](https://github.com/jeetiss)! - render text inside links

## 3.0.2

### Patch Changes

- [#2115](https://github.com/diegomura/react-pdf/pull/2115) [`a3f62c9`](https://github.com/diegomura/react-pdf/commit/a3f62c910c0128e0b4312480414dbf8b26dbca1c) Thanks [@jeetiss](https://github.com/jeetiss)! - fix `renderToString` method in node js

* [#2106](https://github.com/diegomura/react-pdf/pull/2106) [`24bb5de`](https://github.com/diegomura/react-pdf/commit/24bb5de969a854cc0226438985b34ef8ae2d7581) Thanks [@RDO34](https://github.com/RDO34)! - Add `dpi` and `bookmark` page prop types

* Updated dependencies [[`24bb5de`](https://github.com/diegomura/react-pdf/commit/24bb5de969a854cc0226438985b34ef8ae2d7581), [`8536f10`](https://github.com/diegomura/react-pdf/commit/8536f103830a9ed00211fc4c821b221377885a07)]:
  - @react-pdf/types@2.1.1
  - @react-pdf/pdfkit@3.0.1

## 3.0.1

### Patch Changes

- [#2056](https://github.com/diegomura/react-pdf/pull/2056) [`2ebba93`](https://github.com/diegomura/react-pdf/commit/2ebba93c43608a31655e99f226f1cf2d7006ac39) Thanks [@jasnross](https://github.com/jasnross)! - fix: TypeError when returning fragments or arrays from render prop

- Updated dependencies [[`ce1c43c`](https://github.com/diegomura/react-pdf/commit/ce1c43c1b450b3737a23a356c5143626ac2a43ad), [`2ebba93`](https://github.com/diegomura/react-pdf/commit/2ebba93c43608a31655e99f226f1cf2d7006ac39), [`992b91b`](https://github.com/diegomura/react-pdf/commit/992b91b3866e8e24efa014eef4d3eeec6a40f9a5)]:
  - @react-pdf/font@2.3.1
  - @react-pdf/layout@3.2.1

## 3.0.0

### Major Changes

- [#1908](https://github.com/diegomura/react-pdf/pull/1908) [`d1f3d5b`](https://github.com/diegomura/react-pdf/commit/d1f3d5b9b4103705e95e2160347ee253d842ed5d) Thanks [@diegomura](https://github.com/diegomura)! - chore: use fontkit mainline repo + drop node 12

### Minor Changes

- [#1891](https://github.com/diegomura/react-pdf/pull/1891) [`a5a933c`](https://github.com/diegomura/react-pdf/commit/a5a933c9733e4c77338ef76a2b3545b84a646a81) Thanks [@carlobeltrame](https://github.com/carlobeltrame)! - feat: compatibility with modern web bundlers and browsers

### Patch Changes

- [#1604](https://github.com/diegomura/react-pdf/pull/1604) [`7eefc33`](https://github.com/diegomura/react-pdf/commit/7eefc3323390c59bf6d4f923749526831572ef1a) Thanks [@jeetiss](https://github.com/jeetiss)! - fix: skip empty text instance creation in jsx conditions

* [#1924](https://github.com/diegomura/react-pdf/pull/1924) [`3b054b7`](https://github.com/diegomura/react-pdf/commit/3b054b711f5dc0b1c4fd29feaf85b430baad2663) Thanks [@adamduncan](https://github.com/adamduncan)! - fix: bad type on onClick

- [#1929](https://github.com/diegomura/react-pdf/pull/1929) [`9996158`](https://github.com/diegomura/react-pdf/commit/9996158636edf2118c4a6dcce08a00408b982993) Thanks [@diegomura](https://github.com/diegomura)! - feat: remove blob stream dependency

- Updated dependencies [[`a5a933c`](https://github.com/diegomura/react-pdf/commit/a5a933c9733e4c77338ef76a2b3545b84a646a81), [`001a208`](https://github.com/diegomura/react-pdf/commit/001a20812fa039d09931b22eb97a8869e3b31cc5), [`5fe9754`](https://github.com/diegomura/react-pdf/commit/5fe9754f21f103e17d1b70498ee7961cde779b22), [`d1f3d5b`](https://github.com/diegomura/react-pdf/commit/d1f3d5b9b4103705e95e2160347ee253d842ed5d), [`27403f9`](https://github.com/diegomura/react-pdf/commit/27403f9a6ac1bbcfb144afc201c4a3e5aca25cbd), [`9996158`](https://github.com/diegomura/react-pdf/commit/9996158636edf2118c4a6dcce08a00408b982993), [`1a89506`](https://github.com/diegomura/react-pdf/commit/1a89506b4d325822d1a60a8f964434a6f6eb2d3f)]:
  - @react-pdf/pdfkit@3.0.0
  - @react-pdf/font@2.3.0
  - @react-pdf/layout@3.2.0
  - @react-pdf/render@3.2.1

## 2.3.0

### Minor Changes

- [#1902](https://github.com/diegomura/react-pdf/pull/1902) [`d011983`](https://github.com/diegomura/react-pdf/commit/d011983204cf45876594fa361f24b47e86c612c9) Thanks [@adamduncan](https://github.com/adamduncan)! - feat: add onClick event to PDFDownloadLink

### Patch Changes

- Updated dependencies [[`3acf53b`](https://github.com/diegomura/react-pdf/commit/3acf53b45200fa1415315f7dc22cc4b84a6b54c6), [`035d3f8`](https://github.com/diegomura/react-pdf/commit/035d3f8d24fa4f4af9f350950d81b51547858367), [`9527fe4`](https://github.com/diegomura/react-pdf/commit/9527fe4c9087818421eca4753172b06e3c0cb934), [`e94e50a`](https://github.com/diegomura/react-pdf/commit/e94e50a931df7347a8febc717ca76843502826c8), [`884695b`](https://github.com/diegomura/react-pdf/commit/884695b44feb974f155c83e0714e8e939b4f641b)]:
  - @react-pdf/font@2.2.1
  - @react-pdf/pdfkit@2.4.0
  - @react-pdf/render@3.2.0
  - @react-pdf/layout@3.1.2

## 2.2.0

### Minor Changes

- [#1867](https://github.com/diegomura/react-pdf/pull/1867) [`4fadb48`](https://github.com/diegomura/react-pdf/commit/4fadb48983d7269452f89f80c7e341ece859aaee) Thanks [@diegomura](https://github.com/diegomura)! - feat: add page layout support

* [#1868](https://github.com/diegomura/react-pdf/pull/1868) [`ce8762f`](https://github.com/diegomura/react-pdf/commit/ce8762f6de5c796e69ec5a225c7f3ff9c619a960) Thanks [@diegomura](https://github.com/diegomura)! - feat: add page mode support

### Patch Changes

- Updated dependencies [[`eecddbd`](https://github.com/diegomura/react-pdf/commit/eecddbda083561273eda21ee9b8d6107ad21800b), [`1411d16`](https://github.com/diegomura/react-pdf/commit/1411d162e04ca237bad93729695c363fdf4bdbeb), [`205aa03`](https://github.com/diegomura/react-pdf/commit/205aa0334c67e7436d0a35b95b919ecee189a192), [`70c3c9f`](https://github.com/diegomura/react-pdf/commit/70c3c9f52517dc2820765e657dd2bff6b47d1ef2), [`22fb0f0`](https://github.com/diegomura/react-pdf/commit/22fb0f008ac2a2e251657e9cbd97ccedb4ff67db), [`4fadb48`](https://github.com/diegomura/react-pdf/commit/4fadb48983d7269452f89f80c7e341ece859aaee), [`d958b0a`](https://github.com/diegomura/react-pdf/commit/d958b0ae06a61c157b2581488a9121a0464222f4), [`24f5c77`](https://github.com/diegomura/react-pdf/commit/24f5c77706e12dbab45053cb704a2fe7cf60eb53), [`ce8762f`](https://github.com/diegomura/react-pdf/commit/ce8762f6de5c796e69ec5a225c7f3ff9c619a960), [`5d2c308`](https://github.com/diegomura/react-pdf/commit/5d2c3088cf438a8abf1038b14a21117fecf59d57), [`9347466`](https://github.com/diegomura/react-pdf/commit/9347466e8cd33d149678903cf4cf53850a8fc64a), [`6730bc2`](https://github.com/diegomura/react-pdf/commit/6730bc210712e6fc67b94f89f23a3d86f6a203f9), [`810f459`](https://github.com/diegomura/react-pdf/commit/810f45904e9abeaff5583ed4ceb6d77e123bbaea)]:
  - @react-pdf/render@3.1.0
  - @react-pdf/layout@3.1.0
  - @react-pdf/pdfkit@2.3.0
  - @react-pdf/types@2.1.0

## 2.1.2

### Patch Changes

- [#1836](https://github.com/diegomura/react-pdf/pull/1836) [`6c799ec`](https://github.com/diegomura/react-pdf/commit/6c799ec1bbe17106df6db109df4a62c70e39bd24) Thanks [@diegomura](https://github.com/diegomura)! - refactor: remove unused ramda dependency

- Updated dependencies [[`e938df0`](https://github.com/diegomura/react-pdf/commit/e938df0857642707b10b7f65f17ed22dc394ac1b), [`7c1d373`](https://github.com/diegomura/react-pdf/commit/7c1d373a06b04369e762069be4b96d4e40371ecc), [`5458a00`](https://github.com/diegomura/react-pdf/commit/5458a00979d883341c6df094243cae859344d2b9), [`9bdb5c9`](https://github.com/diegomura/react-pdf/commit/9bdb5c934a822340754cd4c892d399f91f6218de), [`fe0f214`](https://github.com/diegomura/react-pdf/commit/fe0f214dbbf2f632b852ebfe65f886ecc4dd6953), [`7e97bb5`](https://github.com/diegomura/react-pdf/commit/7e97bb579aaa847e5a2de650b5b327ac90a465c7), [`9a2b935`](https://github.com/diegomura/react-pdf/commit/9a2b935cfe173f80425ed87d9f474da271c050d2), [`25a80eb`](https://github.com/diegomura/react-pdf/commit/25a80ebd5f96ade7101883624010bad51474967c)]:
  - @react-pdf/primitives@3.0.0
  - @react-pdf/layout@3.0.0
  - @react-pdf/render@3.0.0
  - @react-pdf/types@2.0.9
  - @react-pdf/font@2.2.0
  - @react-pdf/pdfkit@2.2.0

## 2.1.1

### Patch Changes

- [#1681](https://github.com/diegomura/react-pdf/pull/1681) [`4eddbf5`](https://github.com/diegomura/react-pdf/commit/4eddbf5f21f5d58d4591d77e121faad5159424fc) Thanks [@dschu-lab](https://github.com/dschu-lab)! - defined renderToStream to return promise

- Updated dependencies [[`90ab2f8`](https://github.com/diegomura/react-pdf/commit/90ab2f8c040afc3d42961404bdf2ae09fac599eb)]:
  - @react-pdf/font@2.1.1
  - @react-pdf/layout@2.1.1

## 2.1.0

### Minor Changes

- [#1610](https://github.com/diegomura/react-pdf/pull/1610) [`4c5d527`](https://github.com/diegomura/react-pdf/commit/4c5d52721d29d843f1d09c3fd74370832429f70e) Thanks [@jeetiss](https://github.com/jeetiss)! - updated rollup rollup-plugins and babel

* [#1654](https://github.com/diegomura/react-pdf/pull/1654) [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b) Thanks [@jeetiss](https://github.com/jeetiss)! - added `@babel/runtime` to dependencies

### Patch Changes

- [#1605](https://github.com/diegomura/react-pdf/pull/1605) [`e7a93bc`](https://github.com/diegomura/react-pdf/commit/e7a93bcc18ef1dad74dcc80e84e5dcf6e4b04443) Thanks [@jeetiss](https://github.com/jeetiss)! - removed duplicate of `scheduler` package

* [#1581](https://github.com/diegomura/react-pdf/pull/1581) [`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca) Thanks [@jeetiss](https://github.com/jeetiss)! - added changelog with changesets

* Updated dependencies [[`6f0e8d2`](https://github.com/diegomura/react-pdf/commit/6f0e8d2a130d39350cc4f61ff5c743b4b262c98a), [`4c5d527`](https://github.com/diegomura/react-pdf/commit/4c5d52721d29d843f1d09c3fd74370832429f70e), [`46a4b0c`](https://github.com/diegomura/react-pdf/commit/46a4b0c88836e0653db0c8bae6f71f969882277c), [`d341ae6`](https://github.com/diegomura/react-pdf/commit/d341ae66e91774e95e82deb8d9162bf458688768), [`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca), [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b), [`a592e99`](https://github.com/diegomura/react-pdf/commit/a592e99f7df7481697582c2a12f31ce7f9559c66)]:
  - @react-pdf/layout@2.1.0
  - @react-pdf/font@2.1.0
  - @react-pdf/pdfkit@2.1.0
  - @react-pdf/render@2.1.0
  - @react-pdf/primitives@2.0.2
  - @react-pdf/types@2.0.8
