'use client';

import dynamic from 'next/dynamic';
import {
  Document,
  Page,
  View,
  Text,
  Checkbox,
  TextInput,
  Picker,
} from '@react-pdf/renderer';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function Form() {
  const doc = (
    <Document>
      <Page>
        <View
          style={{
            backgroundColor: 'rgba(182,28,28,0.62)',
            width: '30%',
            height: '100%',
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text>TextInput</Text>
            <TextInput
              name="page1.username"
              value="foo"
              align="center"
              style={{ height: '50px' }}
            />

            {/* Nested works as well */}
            <View>
              <Text>TextInput</Text>
              <TextInput
                name="page1.password"
                value="bar"
                align="center"
                style={{ height: '50px' }}
                password
              />
            </View>

            <Text>Checkbox (not checked)</Text>
            <Checkbox name="checkbox-default" style={{ height: '20px' }} />

            <Text>Checkbox (checked)</Text>
            <Checkbox
              name="page1.checkbox-checked"
              checked
              style={{ height: '20px' }}
            />

            <Text>Picker (Combo)</Text>
            <Picker
              type="combo"
              name="page1.combo"
              select={['', 'option 1', 'option 2']}
              value=""
              defaultValue=""
              style={{ height: '20px' }}
            />

            <Text>Picker (List)</Text>
            <Picker
              type="list"
              name="page1.list"
              select={['', 'option 1', 'option 2']}
              value=""
              defaultValue=""
              style={{ height: '50px' }}
            />
          </View>
        </View>
      </Page>

      <Page>
        <View
          style={{
            backgroundColor: 'rgba(182,28,28,0.62)',
            width: '30%',
            height: '100%',
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text>TextInput (multiline)</Text>
            <TextInput
              name="page2.details"
              value="hello"
              align="center"
              multiline
              style={{ fontSize: 8, height: '100px' }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );

  return <PDFViewer className="w-full h-svh">{doc}</PDFViewer>;
}
