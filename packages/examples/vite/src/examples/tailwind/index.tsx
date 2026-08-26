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

/* Rubik's default figures are proportional, so tabular-nums has something
   visible to do -- Roboto's are already tabular. */
Font.register({ family: 'Rubik', fonts: [{ src: RubikRegular }] });

/* `brand` is a new colour, and `slate.500` overrides a single shade of a
   built-in ramp -- the other slates below it still come from Tailwind. */
const tw = createTw({
  fontFamily: { sans: ['Roboto'], rubik: ['Rubik'] },
  colors: {
    brand: '#4069b4',
    slate: { 500: '#5b7db1' },
  },
  spacing: { gutter: '1.5rem' },
});

const LOREM =
  'Tailwind class strings resolve to plain react-pdf style objects, so layout, ' +
  'pagination and text measurement all behave exactly as they would with a ' +
  'hand-written StyleSheet. Nothing here is special-cased by the renderer.';

const Section = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <View style={tw('mb-gutter')} wrap={false}>
    <View style={tw('flex-row items-baseline gap-2 mb-2')}>
      <Text style={tw('text-xs font-medium text-slate-800 uppercase')}>
        {title}
      </Text>
      {hint ? (
        <Text style={tw('text-[8px] text-slate-400')}>{hint}</Text>
      ) : null}
    </View>
    {children}
  </View>
);

/* The shape sits in a fixed-height box so a transformed one can overflow its
   own bounds without landing on the caption. */
const Swatch = ({
  label,
  className,
  box = 'h-14',
}: {
  label: string;
  className: string;
  box?: string;
}) => (
  <View style={tw('w-24 items-center')}>
    <View style={tw(`${box} justify-center items-center`)}>
      <View style={tw(className)} />
    </View>
    <Text style={tw('mt-1 text-[7px] text-slate-400')}>{label}</Text>
  </View>
);

const Tailwind = () => (
  <Document>
    <Page size="A4" style={tw('bg-white px-12 py-10 font-sans text-slate-800')}>
      <View style={tw('mb-gutter pb-4 border-b border-slate-200')}>
        <Text style={tw('text-2xl font-bold text-brand')}>
          Tailwind in react-pdf
        </Text>
        <Text style={tw('mt-1 text-[9px] text-slate-500')}>
          Every style on this page comes from a Tailwind class string passed
          through createTw.
        </Text>
      </View>

      <Section title="Layout" hint="flex · gap · padding · radius · border">
        <View style={tw('flex-row gap-2')}>
          <View style={tw('flex-1 p-3 bg-slate-100 rounded-lg')}>
            <Text style={tw('text-[9px]')}>flex-1</Text>
          </View>
          <View
            style={tw(
              'flex-1 p-3 bg-brand rounded-lg border-2 border-slate-800',
            )}
          >
            <Text style={tw('text-[9px] text-white')}>border-2</Text>
          </View>
          <View style={tw('p-3 bg-slate-500 rounded-full')}>
            <Text style={tw('text-[9px] text-white')}>rounded-full</Text>
          </View>
        </View>
      </Section>

      <Section title="Sizing" hint="size-* · aspect-*">
        <View style={tw('flex-row')}>
          <Swatch label="size-8" className="size-8 bg-brand rounded" />
          <Swatch label="size-12" className="size-12 bg-brand rounded" />
          <Swatch
            label="w-20 aspect-video"
            className="w-20 aspect-video bg-slate-500 rounded"
          />
          <Swatch
            label="w-12 aspect-square"
            className="w-12 aspect-square bg-slate-500 rounded"
          />
        </View>
        {/* Fractional widths resolve against the parent, so these need a
            full-width row rather than a shrink-to-fit swatch. */}
        <View style={tw('mt-1 gap-1')}>
          <View style={tw('w-1/4 h-3 bg-slate-300 rounded-sm')} />
          <View style={tw('w-1/2 h-3 bg-slate-300 rounded-sm')} />
          <View style={tw('w-full h-3 bg-slate-300 rounded-sm')} />
          <Text style={tw('text-[7px] text-slate-400')}>
            w-1/4 · w-1/2 · w-full
          </Text>
        </View>
      </Section>

      <Section title="Transforms" hint="rotate · skew · scale, chained">
        <View style={tw('flex-row')}>
          <Swatch label="rotate-12" className="size-10 bg-brand rotate-12" />
          <Swatch label="skew-x-12" className="size-10 bg-brand skew-x-12" />
          <Swatch label="-skew-y-6" className="size-10 bg-brand -skew-y-6" />
          <Swatch label="scale-75" className="size-10 bg-brand scale-75" />
          <Swatch
            label="rotate-45 skew-x-6"
            className="size-10 bg-slate-500 rotate-45 skew-x-6"
          />
        </View>
      </Section>

      <Section title="Typography" hint="size · weight · tracking · numerics">
        <View style={tw('gap-1')}>
          <Text style={tw('text-lg font-bold')}>text-lg font-bold</Text>
          <Text style={tw('text-sm text-slate-500 tracking-wide')}>
            text-sm tracking-wide
          </Text>
          <Text style={tw('text-xs italic underline text-brand')}>
            italic underline
          </Text>
          <View style={tw('flex-row gap-8 mt-1')}>
            <View>
              <Text style={tw('text-[7px] text-slate-400')}>font-rubik</Text>
              <Text style={tw('text-xs font-rubik')}>10,984.00</Text>
              <Text style={tw('text-xs font-rubik')}>11,111.00</Text>
            </View>
            <View>
              <Text style={tw('text-[7px] text-slate-400')}>
                font-rubik tabular-nums
              </Text>
              <Text style={tw('text-xs font-rubik tabular-nums')}>
                10,984.00
              </Text>
              <Text style={tw('text-xs font-rubik tabular-nums')}>
                11,111.00
              </Text>
            </View>
          </View>
        </View>
      </Section>

      <Section title="line-clamp" hint="maps to maxLines">
        <View style={tw('flex-row gap-4')}>
          <View style={tw('flex-1 p-2 bg-slate-100 rounded')}>
            <Text style={tw('text-[8px] text-slate-400 mb-1')}>no clamp</Text>
            <Text style={tw('text-[9px]')}>{LOREM}</Text>
          </View>
          <View style={tw('flex-1 p-2 bg-slate-100 rounded')}>
            <Text style={tw('text-[8px] text-slate-400 mb-1')}>
              line-clamp-2
            </Text>
            <Text style={tw('text-[9px] line-clamp-2')}>{LOREM}</Text>
          </View>
        </View>
      </Section>

      {/* No lineHeight on the wrapping text: an explicit one disables float wrap. */}
      <Section title="float" hint="float-left · clear-both">
        <View style={tw('p-3 bg-slate-100 rounded')}>
          <View style={tw('float-left size-10 mr-2 mb-1 bg-brand rounded')} />
          <Text style={tw('text-[9px]')}>{LOREM}</Text>
          <View style={tw('clear-both')} />
        </View>
      </Section>

      <Section title="Theme config" hint="merges one level deep">
        <View style={tw('flex-row')}>
          <Swatch
            label="brand (new)"
            className="size-8 bg-brand rounded"
            box="h-10"
          />
          <Swatch
            label="slate-500 (custom)"
            className="size-8 bg-slate-500 rounded"
            box="h-10"
          />
          <Swatch
            label="slate-300 (stock)"
            className="size-8 bg-slate-300 rounded"
            box="h-10"
          />
          <Swatch
            label="slate-700 (stock)"
            className="size-8 bg-slate-700 rounded"
            box="h-10"
          />
        </View>
      </Section>
    </Page>
  </Document>
);

export default {
  id: 'tailwind',
  name: 'Tailwind',
  description: '',
  Document: Tailwind,
};
