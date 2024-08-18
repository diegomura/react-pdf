import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Form,
  FormField,
  TextInput,
  Picker,
  FormPushButton,
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
        <Form>
          <FormField name="user-info" style={{ flexDirection: 'column' }}>
            <Text>FormText</Text>
            <TextInput
              name="name"
              value="hello"
              align="center"
              style={{ height: '50px' }}
              password
            />

            <Text>FormCombo</Text>
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

            <Text>FormPushButton</Text>
            <FormPushButton
              name="bouton"
              label="push button"
              style={{ height: '50px' }}
            />
          </FormField>
        </Form>
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
        <Form>
          <FormField name="user-details" style={{ flexDirection: 'column' }}>
            <Text>FormText</Text>
            <TextInput
              name="details"
              value="hello"
              align="center"
              style={{ height: '50px' }}
            />
          </FormField>
        </Form>
      </View>
    </Page>
  </Document>
);

export default FormPdf;
