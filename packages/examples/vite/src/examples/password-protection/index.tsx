import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const ACCENT = '#2563EB';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
  },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lockText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    color: ACCENT,
    marginBottom: 10,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  label: {
    fontSize: 10,
    color: '#64748B',
  },
  value: {
    fontSize: 10,
    color: '#1E293B',
  },
  allowed: {
    fontSize: 10,
    color: '#16A34A',
  },
  denied: {
    fontSize: 10,
    color: '#DC2626',
  },
  body: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 60,
    right: 60,
    textAlign: 'center',
    fontSize: 8,
    color: '#CBD5E1',
  },
});

const PermissionRow = ({
  label,
  allowed,
}: {
  label: string;
  allowed: boolean | string;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={allowed ? styles.allowed : styles.denied}>
      {allowed ? (typeof allowed === 'string' ? allowed : 'Allowed') : 'Denied'}
    </Text>
  </View>
);

const PasswordProtection = () => (
  <Document
    ownerPassword="owner"
    userPassword="user"
    permissions={{
      printing: 'highResolution',
      copying: false,
      modifying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: true,
      documentAssembly: false,
    }}
  >
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.lockIcon}>
          <Text style={styles.lockText}>*</Text>
        </View>
        <View>
          <Text style={styles.title}>Protected Document</Text>
          <Text style={styles.subtitle}>
            ENCRYPTED WITH PASSWORD PROTECTION
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT THIS DOCUMENT</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            This PDF was generated with password protection enabled using
            react-pdf. It demonstrates how to restrict access and control
            permissions on generated documents. The user password is "user" and
            the owner password is "owner".
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CREDENTIALS</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>User Password</Text>
            <Text style={styles.value}>user</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Owner Password</Text>
            <Text style={styles.value}>owner</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERMISSIONS</Text>
        <View style={styles.card}>
          <PermissionRow label="Printing" allowed="High Resolution" />
          <PermissionRow label="Copying" allowed={false} />
          <PermissionRow label="Modifying" allowed={false} />
          <PermissionRow label="Annotating" allowed={false} />
          <PermissionRow label="Filling Forms" allowed={false} />
          <PermissionRow label="Content Accessibility" allowed={true} />
          <PermissionRow label="Document Assembly" allowed={false} />
        </View>
      </View>

      <Text style={styles.footer}>
        Generated with react-pdf password protection
      </Text>
    </Page>
  </Document>
);

export default {
  id: 'password-protection',
  name: 'Password Protection',
  description: 'PDF with password protection and permissions',
  Document: PasswordProtection,
};
