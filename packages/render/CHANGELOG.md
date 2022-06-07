# @react-pdf/render

## 3.1.0

### Minor Changes

- [#1862](https://github.com/diegomura/react-pdf/pull/1862) [`1411d16`](https://github.com/diegomura/react-pdf/commit/1411d162e04ca237bad93729695c363fdf4bdbeb) Thanks [@diegomura](https://github.com/diegomura)! - feat: bookmarks support

* [#1869](https://github.com/diegomura/react-pdf/pull/1869) [`5d2c308`](https://github.com/diegomura/react-pdf/commit/5d2c3088cf438a8abf1038b14a21117fecf59d57) Thanks [@diegomura](https://github.com/diegomura)! - feat: variable dpi

### Patch Changes

- [#1863](https://github.com/diegomura/react-pdf/pull/1863) [`eecddbd`](https://github.com/diegomura/react-pdf/commit/eecddbda083561273eda21ee9b8d6107ad21800b) Thanks [@diegomura](https://github.com/diegomura)! - fix: dont use global image cache

* [#1864](https://github.com/diegomura/react-pdf/pull/1864) [`205aa03`](https://github.com/diegomura/react-pdf/commit/205aa0334c67e7436d0a35b95b919ecee189a192) Thanks [@diegomura](https://github.com/diegomura)! - fix: props undefiend access

- [#1857](https://github.com/diegomura/react-pdf/pull/1857) [`d958b0a`](https://github.com/diegomura/react-pdf/commit/d958b0ae06a61c157b2581488a9121a0464222f4) Thanks [@diegomura](https://github.com/diegomura)! - feat: embed same image once in final document

* [#1865](https://github.com/diegomura/react-pdf/pull/1865) [`24f5c77`](https://github.com/diegomura/react-pdf/commit/24f5c77706e12dbab45053cb704a2fe7cf60eb53) Thanks [@diegomura](https://github.com/diegomura)! - feat: add background color and border with Note support

- [#1855](https://github.com/diegomura/react-pdf/pull/1855) [`9347466`](https://github.com/diegomura/react-pdf/commit/9347466e8cd33d149678903cf4cf53850a8fc64a) Thanks [@diegomura](https://github.com/diegomura)! - fix: image dimension warning for JSON sources

* [#1861](https://github.com/diegomura/react-pdf/pull/1861) [`6730bc2`](https://github.com/diegomura/react-pdf/commit/6730bc210712e6fc67b94f89f23a3d86f6a203f9) Thanks [@diegomura](https://github.com/diegomura)! - fix: image opacity 0 rendering

- [#1859](https://github.com/diegomura/react-pdf/pull/1859) [`810f459`](https://github.com/diegomura/react-pdf/commit/810f45904e9abeaff5583ed4ceb6d77e123bbaea) Thanks [@diegomura](https://github.com/diegomura)! - feat: build render package as ES module

- Updated dependencies [[`1411d16`](https://github.com/diegomura/react-pdf/commit/1411d162e04ca237bad93729695c363fdf4bdbeb), [`4fadb48`](https://github.com/diegomura/react-pdf/commit/4fadb48983d7269452f89f80c7e341ece859aaee), [`ce8762f`](https://github.com/diegomura/react-pdf/commit/ce8762f6de5c796e69ec5a225c7f3ff9c619a960), [`5d2c308`](https://github.com/diegomura/react-pdf/commit/5d2c3088cf438a8abf1038b14a21117fecf59d57)]:
  - @react-pdf/types@2.1.0

## 3.0.0

### Major Changes

- [#1834](https://github.com/diegomura/react-pdf/pull/1834) [`7e97bb5`](https://github.com/diegomura/react-pdf/commit/7e97bb579aaa847e5a2de650b5b327ac90a465c7) Thanks [@diegomura](https://github.com/diegomura)! - refactor: remove ramda from render package

### Patch Changes

- [#1827](https://github.com/diegomura/react-pdf/pull/1827) [`7c1d373`](https://github.com/diegomura/react-pdf/commit/7c1d373a06b04369e762069be4b96d4e40371ecc) Thanks [@diegomura](https://github.com/diegomura)! - refactor: remove ramda from layout package

* [#1838](https://github.com/diegomura/react-pdf/pull/1838) [`9bdb5c9`](https://github.com/diegomura/react-pdf/commit/9bdb5c934a822340754cd4c892d399f91f6218de) Thanks [@diegomura](https://github.com/diegomura)! - feat: create fns package

* Updated dependencies [[`e938df0`](https://github.com/diegomura/react-pdf/commit/e938df0857642707b10b7f65f17ed22dc394ac1b), [`9bdb5c9`](https://github.com/diegomura/react-pdf/commit/9bdb5c934a822340754cd4c892d399f91f6218de), [`fe0f214`](https://github.com/diegomura/react-pdf/commit/fe0f214dbbf2f632b852ebfe65f886ecc4dd6953), [`9a2b935`](https://github.com/diegomura/react-pdf/commit/9a2b935cfe173f80425ed87d9f474da271c050d2)]:
  - @react-pdf/primitives@3.0.0
  - @react-pdf/fns@1.0.0
  - @react-pdf/textkit@3.0.0
  - @react-pdf/types@2.0.9

## 2.1.0

### Minor Changes

- [#1654](https://github.com/diegomura/react-pdf/pull/1654) [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b) Thanks [@jeetiss](https://github.com/jeetiss)! - added `@babel/runtime` to dependencies

### Patch Changes

- [#1648](https://github.com/diegomura/react-pdf/pull/1648) [`46a4b0c`](https://github.com/diegomura/react-pdf/commit/46a4b0c88836e0653db0c8bae6f71f969882277c) Thanks [@jeetiss](https://github.com/jeetiss)! - fixed render crush when a node has `debug` prop and `margin: auto`

* [#1581](https://github.com/diegomura/react-pdf/pull/1581) [`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca) Thanks [@jeetiss](https://github.com/jeetiss)! - added changelog with changesets

* Updated dependencies [[`04449ab`](https://github.com/diegomura/react-pdf/commit/04449ab352db0cca2155024dd3e8c690e42193ca), [`5d2d688`](https://github.com/diegomura/react-pdf/commit/5d2d688e18c830bb96c6e08446437d29f9f9c65f), [`ccf3bf2`](https://github.com/diegomura/react-pdf/commit/ccf3bf22867a9bd49668cdd3543ec32492a40e4b)]:
  - @react-pdf/primitives@2.0.2
  - @react-pdf/textkit@2.1.0
  - @react-pdf/types@2.0.8
