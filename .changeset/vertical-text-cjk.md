---
"@react-pdf/textkit": minor
"@react-pdf/stylesheet": minor
"@react-pdf/font": minor
"@react-pdf/layout": minor
"@react-pdf/render": minor
"@react-pdf/renderer": minor
---

feat: add vertical writing mode and built-in CJK font support

### Vertical Writing Mode

Added `writingMode` style property for `<Text>` elements, supporting vertical top-to-bottom text layout commonly used in CJK (Chinese, Japanese, Korean) typography.

```jsx
<Text style={{ writingMode: 'vertical-rl', fontSize: 24 }}>
  모든 사람은 의견의 자유와 표현의 자유에 대한 권리를 가진다.
</Text>
```

Supported values:
- `horizontal-tb` (default) — standard left-to-right, top-to-bottom
- `vertical-rl` — top-to-bottom, columns from right to left
- `vertical-lr` — top-to-bottom, columns from left to right

### Built-in CJK Fonts

CJK fonts (Noto Sans) are now registered automatically and lazily loaded from Google Fonts. No manual `Font.register()` needed.

```jsx
import { CJK } from '@react-pdf/renderer';

// Explicit font selection
<Text style={{ fontFamily: CJK.KOREAN }}>한국어 텍스트</Text>

// Or just use CJK text — fonts are auto-detected and loaded
<Text>日本語テキスト</Text>
```

Available fonts: `CJK.CHINESE_SIMPLIFIED`, `CJK.CHINESE_TRADITIONAL`, `CJK.JAPANESE`, `CJK.KOREAN`.

### Font IntelliSense

`fontFamily` now provides autocomplete for all built-in fonts (Helvetica, Courier, Times-Roman, and CJK Noto Sans families) while still accepting custom registered font names.
