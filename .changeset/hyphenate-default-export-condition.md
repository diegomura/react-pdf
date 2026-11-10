---
'@react-pdf/hyphenate': patch
---

Add a `default` export condition next to `import`, so loaders that resolve through `require` (tsx, Jest, ts-node) can load `@react-pdf/hyphenate/en-us` instead of failing with `ERR_PACKAGE_PATH_NOT_EXPORTED`.
