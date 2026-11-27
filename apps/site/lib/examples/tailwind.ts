const tailwind = `import { createTw } from '@react-pdf/tailwind';

// Tailwind's default font stacks name web families, so map the ones you use to
// fonts react-pdf can draw
const tw = createTw({
  fontFamily: {
    sans: ['Helvetica'],
  },
  colors: {
    brand: '#4f46e5',
  },
});

const Row = ({ item, qty, price, muted }) => (
  <View style={tw(\`flex-row py-2 border-b \${muted ? 'border-gray-100' : 'border-gray-200'}\`)}>
    <Text style={tw('flex-1 text-[10px] text-gray-800')}>{item}</Text>
    <Text style={tw('w-16 text-[10px] text-right text-gray-500')}>{qty}</Text>
    <Text style={tw('w-20 text-[10px] text-right text-gray-800')}>{price}</Text>
  </View>
);

const doc = (
  <Document>
    <Page size="A4" style={tw('bg-white font-sans p-10 landscape:p-16')}>
      <View style={tw('flex-row justify-between items-start pb-6 border-b-2 border-brand')}>
        <View>
          <Text style={tw('text-2xl font-bold text-gray-900')}>Invoice</Text>
          <Text style={tw('mt-1 text-[10px] text-gray-400')}>#2026-0042</Text>
        </View>
        <View style={tw('items-end')}>
          <Text style={tw('text-[10px] text-gray-500')}>Issued 28 Aug 2026</Text>
          <Text style={tw('mt-1 text-[10px] text-gray-500')}>Due 27 Sep 2026</Text>
        </View>
      </View>

      <View style={tw('flex-row gap-4 mt-6')}>
        <View style={tw('flex-1 rounded-lg bg-brand/5 p-4')}>
          <Text style={tw('text-[8px] uppercase tracking-wide text-brand')}>Billed to</Text>
          <Text style={tw('mt-2 text-xs text-gray-900')}>Acme Corporation</Text>
          <Text style={tw('mt-1 text-[10px] leading-normal text-gray-500')}>
            120 Fifth Avenue{'\\n'}New York, NY 10011
          </Text>
        </View>
        <View style={tw('flex-1 rounded-lg bg-gray-50 p-4')}>
          <Text style={tw('text-[8px] uppercase tracking-wide text-gray-400')}>From</Text>
          <Text style={tw('mt-2 text-xs text-gray-900')}>react-pdf studio</Text>
          <Text style={tw('mt-1 text-[10px] leading-normal text-gray-500')}>
            Rendered with @react-pdf/tailwind
          </Text>
        </View>
      </View>

      <View style={tw('mt-8')}>
        <View style={tw('flex-row border-b border-gray-300 pb-2')}>
          <Text style={tw('flex-1 text-[8px] uppercase tracking-wide text-gray-400')}>Description</Text>
          <Text style={tw('w-16 text-[8px] uppercase tracking-wide text-right text-gray-400')}>Qty</Text>
          <Text style={tw('w-20 text-[8px] uppercase tracking-wide text-right text-gray-400')}>Amount</Text>
        </View>
        <Row item="Design system audit" qty="1" price="$2,400.00" />
        <Row item="Component library" qty="12" price="$4,800.00" muted />
        <Row item="PDF templates" qty="6" price="$1,800.00" />
        <Row item="Support retainer" qty="3" price="$900.00" muted />
      </View>

      <View style={tw('mt-6 flex-row justify-end')}>
        <View style={tw('w-52')}>
          <View style={tw('flex-row justify-between')}>
            <Text style={tw('text-[10px] text-gray-500')}>Subtotal</Text>
            <Text style={tw('text-[10px] text-gray-800')}>$9,900.00</Text>
          </View>
          <View style={tw('mt-1 flex-row justify-between')}>
            <Text style={tw('text-[10px] text-gray-500')}>Tax (8.875%)</Text>
            <Text style={tw('text-[10px] text-gray-800')}>$878.63</Text>
          </View>
          <View style={tw('mt-3 flex-row justify-between rounded-md bg-brand p-3')}>
            <Text style={tw('text-xs font-bold text-white')}>Total</Text>
            <Text style={tw('text-xs font-bold text-white')}>$10,778.63</Text>
          </View>
        </View>
      </View>

      <Text style={tw('mt-auto text-center text-[8px] text-gray-400')}>
        Styled entirely with Tailwind classes, no StyleSheet in sight
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc);`;

export default tailwind;
