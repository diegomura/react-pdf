import React from 'react';

import {
  Document,
  Page,
  View,
  Text,
  Checkbox,
  FieldSet,
  TextInput,
  Select,
  List,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  fieldset: {
    flexDirection: 'column',
    backgroundColor: 'rgba(182,28,28,0.62)',
    width: '50%',
    marginBottom: 50,
  },
});

const MyDoc = () => {
  return (
    <Page style={{ alignItems: 'center', justifyContent: 'center' }}>
      <FieldSet name="user-info" style={styles.fieldset}>
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
        <Checkbox name="checkbox-checked" checked style={{ height: '20px' }} />

        <Text>Select</Text>
        <Select
          name="combo"
          select={['', 'option 1', 'option 2']}
          value=""
          defaultValue=""
          style={{ height: '20px' }}
        />

        <Text>List</Text>
        <List
          name="list"
          select={['', 'option 1', 'option 2']}
          value=""
          defaultValue=""
          style={{ height: '50px' }}
        />
      </FieldSet>

      <FieldSet name="user-details" style={styles.fieldset}>
        <Text>TextInput (multiline)</Text>
        <TextInput
          name="details"
          value="hello"
          align="center"
          multiline
          style={{ fontSize: 8, height: '100px' }}
        />
      </FieldSet>

      <View style={styles.fieldset}>
        <Text>TextInput (no FieldSet)</Text>
        <TextInput
          name="textinput-no-fieldset"
          value="no fieldset"
          align="center"
          style={{ height: '50px' }}
        />

        <Text>Checkbox (checked, no FieldSet)</Text>
        <Checkbox
          name="checkbox-no-fieldset"
          checked
          style={{ height: '20px' }}
        />
      </View>
    </Page>
  );
};

const Forms = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'forms',
  name: 'Forms',
  description: '',
  Document: Forms,
};
