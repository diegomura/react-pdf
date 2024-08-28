import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Checkbox,
  FormField,
  TextInput,
  Picker,
  FormList,
} from '@react-pdf/renderer';

const FormPdf = () => (
  <Document>
    <Page>
      <View
        style={{
          backgroundColor: 'rgba(182,28,28,0.62)',
          width: '30%',
          height: '100%',
        }}
      >
        <FormField name="user-info" style={{ flexDirection: 'column' }}>
          <Text>TextInput</Text>
          <TextInput
            name="username"
            value="foo"
            align="center"
            style={{ height: '50px' }}
          />

          {/* Nested works as well */}
          <View>
            <Text>TextInput</Text>
            <TextInput
              name="password"
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
            name="checkbox-checked"
            checked
            style={{ height: '20px' }}
          />

          <Text>Picker</Text>
          <Picker
            name="combo"
            select={['', 'option 1', 'option 2']}
            value=""
            defaultValue=""
            style={{ height: '20px' }}
          />

          <Text>FormList</Text>
          <FormList
            name="list"
            select={['', 'option 1', 'option 2']}
            value=""
            defaultValue=""
            style={{ height: '50px' }}
          />
        </FormField>
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
        <FormField name="user-details" style={{ flexDirection: 'column' }}>
          <Text>TextInput (multiline)</Text>
          <TextInput
            name="details"
            value="hello"
            align="center"
            multiline
            style={{ fontSize: 8, height: '100px' }}
          />
        </FormField>
      </View>
    </Page>
  </Document>
);

export default FormPdf;
