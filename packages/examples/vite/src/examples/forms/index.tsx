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
  page: {
    backgroundColor: '#fafafa',
    padding: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 10,
    color: '#333',
    marginBottom: 4,
  },
  textInput: {
    height: 32,
  },
  textInputMultiline: {
    fontSize: 8,
    height: 80,
  },
  checkbox: {
    height: 16,
  },
  select: {
    height: 20,
  },
  list: {
    height: 44,
  },
});

const MyDoc = () => {
  return (
    <Page style={styles.page}>
      <Text style={styles.title}>Forms</Text>
      <Text style={styles.subtitle}>Interactive form components</Text>

      <FieldSet name="user-info" style={styles.card}>
        <Text style={styles.sectionLabel}>User Information</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            name="username"
            value="foo"
            align="center"
            style={styles.textInput}
          />
        </View>

        {/* Nested works as well */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            name="password"
            value="bar"
            align="center"
            style={styles.textInput}
            password
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Checkbox (not checked)</Text>
          <Checkbox name="checkbox-default" style={styles.checkbox} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Checkbox (checked)</Text>
          <Checkbox name="checkbox-checked" checked style={styles.checkbox} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Select</Text>
          <Select
            name="combo"
            select={['', 'option 1', 'option 2']}
            value=""
            defaultValue=""
            style={styles.select}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>List</Text>
          <List
            name="list"
            select={['', 'option 1', 'option 2']}
            value=""
            defaultValue=""
            style={styles.list}
          />
        </View>
      </FieldSet>

      <FieldSet name="user-details" style={styles.card}>
        <Text style={styles.sectionLabel}>User Details</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Details (multiline)</Text>
          <TextInput
            name="details"
            value="hello"
            align="center"
            multiline
            style={styles.textInputMultiline}
          />
        </View>
      </FieldSet>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Standalone Fields</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>TextInput (no FieldSet)</Text>
          <TextInput
            name="textinput-no-fieldset"
            value="no fieldset"
            align="center"
            style={styles.textInput}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Checkbox (checked, no FieldSet)</Text>
          <Checkbox
            name="checkbox-no-fieldset"
            checked
            style={styles.checkbox}
          />
        </View>
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
