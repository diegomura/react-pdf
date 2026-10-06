/**
 * The Painter object passed to a Canvas `paint` callback. These are pdfkit's
 * drawing methods, grouped so the set is scannable — the reference for what
 * each one takes lives in pdfkit's own docs, which the page links to.
 */
const painterGroups: { name: string; methods: string[] }[] = [
  {
    name: 'Shapes',
    methods: ['rect', 'roundedRect', 'circle', 'ellipse', 'polygon'],
  },
  {
    name: 'Paths',
    methods: ['path', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo'],
  },
  {
    name: 'Painting',
    methods: ['fill', 'stroke', 'clip'],
  },
  {
    name: 'Color',
    methods: [
      'fillColor',
      'strokeColor',
      'opacity',
      'fillOpacity',
      'strokeOpacity',
    ],
  },
  {
    name: 'Strokes',
    methods: ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'dash'],
  },
  {
    name: 'Gradients',
    methods: ['linearGradient', 'radialGradient'],
  },
  {
    name: 'Text',
    methods: ['font', 'fontSize', 'text'],
  },
  {
    name: 'Transform',
    methods: ['translate', 'scale', 'rotate'],
  },
  {
    name: 'State',
    methods: ['save', 'restore'],
  },
];

/** Same groups, flattened for the machine-readable docs. */
export const painterMethodsMarkdown = () =>
  painterGroups
    .map(
      ({ name, methods }) =>
        `### ${name}\n\n` +
        methods.map((method) => `- \`${method}\``).join('\n'),
    )
    .join('\n\n');

export function PainterMethods() {
  return (
    <div className="not-prose border-fd-border divide-fd-border my-8 divide-y border-y">
      {painterGroups.map((group) => (
        <section
          key={group.name}
          className="grid gap-x-8 gap-y-2.5 py-5 sm:grid-cols-[6.5rem_1fr]"
        >
          <div className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.08em] uppercase sm:pt-1.5">
            {group.name}
          </div>
          <ul className="flex flex-wrap items-start gap-1.5">
            {group.methods.map((method) => (
              <li
                key={method}
                className="bg-fd-muted rounded-md px-2 py-1 font-mono text-[0.75rem] leading-5"
              >
                {method}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
