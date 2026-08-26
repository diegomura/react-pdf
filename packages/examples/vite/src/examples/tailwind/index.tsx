import React from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from '@react-pdf/tailwind';

import RobotoRegular from '../../../public/Roboto-Regular.ttf';
import RobotoItalic from '../../../public/Roboto-Italic.ttf';
import RobotoMedium from '../../../public/Roboto-Medium.ttf';
import RobotoBold from '../../../public/Roboto-Bold.ttf';
import RubikRegular from '../../../public/Rubik-Regular.ttf';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoItalic, fontWeight: 400, fontStyle: 'italic' },
    { src: RobotoMedium, fontWeight: 500 },
    { src: RobotoBold, fontWeight: 700 },
  ],
});

// Rubik's figures are proportional; Roboto's are already tabular.
Font.register({ family: 'Rubik', fonts: [{ src: RubikRegular }] });

// The palette the other examples use, named as theme keys. Scales merge one
// level deep, so `slate` keeps every shade it doesn't override.
const tw = createTw({
  fontFamily: { sans: ['Roboto'], rubik: ['Rubik'] },
  colors: {
    page: '#fafafa',
    card: '#ffffff',
    line: '#e8e8e8',
    ink: '#1a1a1a',
    body: '#333333',
    muted: '#666666',
    faint: '#999999',
    subtle: '#888888',
    accent: '#4069b4',
    slate: { 500: '#5b7db1' },
  },
  spacing: { page: 40, card: 12, gutter: 8 },
  borderRadius: { card: 5 },
  fontSize: { title: 18, sub: 9, label: 8, code: 8, sample: 11 },
  letterSpacing: { label: 0.5 },
});

const LOREM =
  'Tailwind class strings resolve to plain react-pdf style objects, so layout, ' +
  'pagination and text measurement all behave exactly as they would with a ' +
  'hand-written StyleSheet. Nothing here is special-cased by the renderer.';

const Card = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View
    style={tw('bg-card rounded-card p-card border border-line mb-gutter')}
    wrap={false}
  >
    <Text style={tw('text-label text-faint uppercase tracking-label mb-2')}>
      {label}
    </Text>
    {children}
  </View>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text style={tw('text-code text-muted')}>{children}</Text>
);

// Fixed-height box so a transformed shape can't land on the caption.
const Swatch = ({
  label,
  className,
  box = 'h-12',
}: {
  label: string;
  className: string;
  box?: string;
}) => (
  <View style={tw('w-24 items-center')}>
    <View style={tw(`${box} justify-center items-center`)}>
      <View style={tw(className)} />
    </View>
    <View style={tw('mt-1')}>
      <Caption>{label}</Caption>
    </View>
  </View>
);

// Identical on both pages; only the geometry the queries see differs.
const Variants = () => (
  <Card label="variants">
    <View style={tw('flex-row gap-3')}>
      <View style={tw('flex-1')}>
        <View
          style={tw('h-7 rounded bg-slate-300 md:bg-slate-500 lg:bg-accent')}
        />
        <View style={tw('mt-1')}>
          <Caption>md:bg-slate-500 lg:bg-accent</Caption>
        </View>
      </View>
      <View style={tw('flex-1')}>
        <View style={tw('h-7 rounded bg-slate-300 landscape:bg-accent')} />
        <View style={tw('mt-1')}>
          <Caption>landscape:bg-accent</Caption>
        </View>
      </View>
    </View>
  </Card>
);

const VariantsPage = ({ orientation }: { orientation?: 'landscape' }) => (
  <Page
    size="A4"
    orientation={orientation}
    style={tw('bg-page p-page font-sans text-body')}
  >
    <Text style={tw('text-title font-bold text-ink mb-1')}>
      Variants · {orientation ?? 'portrait'} page
    </Text>
    <Text style={tw('text-sub text-subtle mb-5')}>
      Breakpoints and orientation become react-pdf media queries, resolved
      against the page box rather than a viewport. Tailwind v4 states
      breakpoints in rem, so at 12pt/rem md is 576pt and lg is 768pt — A4 is
      595pt wide upright and 842pt on its side, so lg and landscape match only
      on the second of these two pages
    </Text>

    <Variants />
  </Page>
);

const Tailwind = () => (
  <Document>
    <Page size="A4" style={tw('bg-page p-page font-sans text-body')}>
      <Text style={tw('text-title font-bold text-ink mb-1')}>Tailwind</Text>
      <Text style={tw('text-sub text-subtle mb-5')}>
        Tailwind utility classes converted to react-pdf styles through createTw
        — every style on this page comes from a class string
      </Text>

      <Card label="layout">
        <View style={tw('flex-row gap-2')}>
          <View style={tw('flex-1 p-2 bg-page rounded border border-line')}>
            <Caption>flex-1</Caption>
          </View>
          <View style={tw('flex-1 p-2 bg-accent rounded')}>
            <Text style={tw('text-code text-card')}>bg-accent</Text>
          </View>
          <View style={tw('p-2 px-3 bg-ink rounded-full')}>
            <Text style={tw('text-code text-card')}>rounded-full</Text>
          </View>
        </View>
      </Card>

      <Card label="sizing · aspect ratio">
        <View style={tw('flex-row')}>
          <Swatch label="size-8" className="size-8 bg-accent rounded" />
          <Swatch label="size-12" className="size-12 bg-accent rounded" />
          <Swatch
            label="w-20 aspect-video"
            className="w-20 aspect-video bg-slate-500 rounded"
          />
          <Swatch
            label="w-12 aspect-square"
            className="w-12 aspect-square bg-slate-500 rounded"
          />
        </View>
        {/* Fractional widths need a full-width row, not a shrink-to-fit swatch. */}
        <View style={tw('mt-2 gap-1')}>
          <View style={tw('w-1/4 h-2 bg-line rounded-sm')} />
          <View style={tw('w-1/2 h-2 bg-line rounded-sm')} />
          <View style={tw('w-full h-2 bg-line rounded-sm')} />
          <Caption>w-1/4 · w-1/2 · w-full</Caption>
        </View>
      </Card>

      <Card label="transforms">
        <View style={tw('flex-row')}>
          <Swatch label="rotate-12" className="size-9 bg-accent rotate-12" />
          <Swatch label="skew-x-12" className="size-9 bg-accent skew-x-12" />
          <Swatch label="-skew-y-6" className="size-9 bg-accent -skew-y-6" />
          <Swatch label="scale-75" className="size-9 bg-accent scale-75" />
          <Swatch
            label="rotate-45 skew-x-6"
            className="size-9 bg-slate-500 rotate-45 skew-x-6"
          />
        </View>
      </Card>

      <Card label="typography">
        <Text style={tw('text-sample font-bold text-ink')}>
          text-sample font-bold
        </Text>
        <Text style={tw('mt-1 text-sub text-muted tracking-wide')}>
          text-sub tracking-wide
        </Text>
        <Text style={tw('mt-1 text-sub italic underline text-accent')}>
          italic underline
        </Text>
        <View style={tw('flex-row gap-8 mt-2')}>
          <View>
            <Caption>font-rubik</Caption>
            <Text style={tw('text-sample font-rubik')}>10,984.00</Text>
            <Text style={tw('text-sample font-rubik')}>11,111.00</Text>
          </View>
          <View>
            <Caption>font-rubik tabular-nums</Caption>
            <Text style={tw('text-sample font-rubik tabular-nums')}>
              10,984.00
            </Text>
            <Text style={tw('text-sample font-rubik tabular-nums')}>
              11,111.00
            </Text>
          </View>
        </View>
      </Card>

      <Card label="line-clamp">
        <View style={tw('flex-row gap-3')}>
          <View style={tw('flex-1')}>
            <Caption>no clamp</Caption>
            <Text style={tw('mt-1 text-sub')}>{LOREM}</Text>
          </View>
          <View style={tw('flex-1')}>
            <Caption>line-clamp-2</Caption>
            <Text style={tw('mt-1 text-sub line-clamp-2')}>{LOREM}</Text>
          </View>
        </View>
      </Card>

      {/* Floats are out of flow and need their own block, or they land on the
          card label. No lineHeight on the text either: it disables wrap. */}
      <Card label="float">
        <View style={tw('relative')}>
          <View style={tw('float-left size-10 mr-2 mb-1 bg-accent rounded')} />
          <Text style={tw('text-sub')}>{LOREM}</Text>
          <View style={tw('clear-both')} />
        </View>
      </Card>

      <Card label="theme config">
        <View style={tw('flex-row')}>
          <Swatch
            label="accent (added)"
            className="size-8 bg-accent rounded"
            box="h-9"
          />
          <Swatch
            label="slate-500 (custom)"
            className="size-8 bg-slate-500 rounded"
            box="h-9"
          />
          <Swatch
            label="slate-300 (stock)"
            className="size-8 bg-slate-300 rounded"
            box="h-9"
          />
          <Swatch
            label="slate-700 (stock)"
            className="size-8 bg-slate-700 rounded"
            box="h-9"
          />
        </View>
      </Card>
    </Page>

    <VariantsPage />
    <VariantsPage orientation="landscape" />
  </Document>
);

export default {
  id: 'tailwind',
  name: 'Tailwind',
  description: '',
  Document: Tailwind,
};
