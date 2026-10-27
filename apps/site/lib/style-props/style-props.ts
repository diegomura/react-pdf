type Prop = [name: string, values?: string];

export const styleGroups: { name: string; props: Prop[] }[] = [
  {
    name: 'Flexbox',
    props: [
      ['flex'],
      ['flexDirection', 'row · column · row-reverse · column-reverse'],
      ['flexWrap', 'nowrap · wrap · wrap-reverse'],
      ['flexFlow'],
      ['flexGrow'],
      ['flexShrink'],
      ['flexBasis'],
      ['alignContent'],
      ['alignItems'],
      ['alignSelf'],
      ['justifyContent'],
      ['gap'],
      ['rowGap'],
      ['columnGap'],
    ],
  },
  {
    name: 'Layout',
    props: [
      ['display', 'flex · none'],
      ['position', 'static · relative · absolute'],
      ['top'],
      ['right'],
      ['bottom'],
      ['left'],
      ['zIndex'],
      ['overflow', 'hidden'],
      ['aspectRatio'],
      ['float', 'left · right · none'],
      ['clear', 'left · right · both · none'],
      ['shapeOutside', 'circle · ellipse · polygon · inset'],
    ],
  },
  {
    name: 'Dimension',
    props: [
      ['width'],
      ['height'],
      ['minWidth'],
      ['minHeight'],
      ['maxWidth'],
      ['maxHeight'],
    ],
  },
  {
    name: 'Spacing',
    props: [
      ['margin'],
      ['marginHorizontal'],
      ['marginVertical'],
      ['marginTop'],
      ['marginRight'],
      ['marginBottom'],
      ['marginLeft'],
      ['padding'],
      ['paddingHorizontal'],
      ['paddingVertical'],
      ['paddingTop'],
      ['paddingRight'],
      ['paddingBottom'],
      ['paddingLeft'],
    ],
  },
  {
    name: 'Border',
    props: [
      ['border'],
      ['borderWidth'],
      ['borderColor'],
      ['borderStyle', 'solid · dashed · dotted'],
      ['borderRadius'],
      ['borderTop'],
      ['borderTopWidth'],
      ['borderTopColor'],
      ['borderTopStyle'],
      ['borderRight'],
      ['borderRightWidth'],
      ['borderRightColor'],
      ['borderRightStyle'],
      ['borderBottom'],
      ['borderBottomWidth'],
      ['borderBottomColor'],
      ['borderBottomStyle'],
      ['borderLeft'],
      ['borderLeftWidth'],
      ['borderLeftColor'],
      ['borderLeftStyle'],
      ['borderTopLeftRadius'],
      ['borderTopRightRadius'],
      ['borderBottomRightRadius'],
      ['borderBottomLeftRadius'],
    ],
  },
  {
    name: 'Color',
    props: [['color'], ['backgroundColor'], ['opacity']],
  },
  {
    name: 'Text',
    props: [
      ['fontFamily'],
      ['fontSize'],
      ['fontStyle', 'normal · italic · oblique'],
      ['fontWeight'],
      ['fontFeatureSettings'],
      ['letterSpacing'],
      ['lineHeight'],
      ['textAlign', 'left · center · right · justify'],
      ['textDecoration', 'underline · line-through · none'],
      ['textDecorationColor'],
      ['textDecorationStyle'],
      ['textIndent'],
      ['textOverflow', 'ellipsis'],
      ['textTransform', 'uppercase · lowercase · capitalize · upperfirst'],
      ['verticalAlign', 'sub · super'],
      ['direction', 'ltr · rtl'],
      ['maxLines'],
    ],
  },
  {
    name: 'Image',
    props: [
      ['objectFit', 'fill · contain · cover · scale-down · none'],
      ['objectPosition'],
    ],
  },
  {
    name: 'Transform',
    props: [
      ['transform', 'rotate · scale · translate · skew · matrix'],
      ['transformOrigin'],
    ],
  },
];

/** `<StyleProps />` renders to markup, so the .mdx endpoints get this instead */
export const styleGroupsMarkdown = () =>
  styleGroups
    .map(
      ({ name, props }) =>
        `### ${name}\n\n` +
        props
          .map(([prop, values]) => `- ${prop}${values ? ` _(${values})_` : ''}`)
          .join('\n'),
    )
    .join('\n\n');
