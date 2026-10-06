# @react-pdf/tailwind

## 0.2.0

### Minor Changes

- [#3536](https://github.com/diegomura/react-pdf/pull/3536) [`9c2e5119ee47e3e92beede0a12870f1ebe3ecc8e`](https://github.com/diegomura/react-pdf/commit/9c2e5119ee47e3e92beede0a12870f1ebe3ecc8e) Thanks [@diegomura](https://github.com/diegomura)! - Add `@react-pdf/tailwind`, a Tailwind CSS to react-pdf style converter. Migrated from [`react-pdf-tailwind`](https://github.com/aanckar/react-pdf-tailwind) by Andreas Anckar, with the author's permission.

  On top of the original: breakpoint and orientation variants map onto react-pdf's media queries (`lg:p-4`, `portrait:`), colour opacity is supported wherever a colour is accepted (`bg-red-500/50`, `text-black/25`), and utilities were added for react-pdf style properties that had no Tailwind mapping — `aspect-*`, `line-clamp-*`, `float-*` / `clear-*`, `skew-*`, `size-*`, and the `font-variant-numeric` utilities. Anything react-pdf can't draw — state variants like `hover:`, lengths like `w-fit`, the default `font-sans` stacks — is reported as an unsupported class rather than emitted and crashing layout.

### Patch Changes

- Updated dependencies [[`10d8365e2eb8fc3987cf94d4d61a7559f4ba1dfb`](https://github.com/diegomura/react-pdf/commit/10d8365e2eb8fc3987cf94d4d61a7559f4ba1dfb)]:
  - @react-pdf/types@2.14.0
