import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Mermaid } from '@react-pdf/mermaid';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const MermaidExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Mermaid Diagrams</Text>
      <Text style={styles.subtitle}>
        Diagrams rendered as vector graphics via @react-pdf/mermaid
      </Text>

      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>Flowchart — System Architecture</Text>
        <Mermaid width={460} height={120}>
          {`graph LR
  A[User Request] --> B[Load Balancer]
  B --> C[Web Server 1]
  B --> D[Web Server 2]
  C --> E[(Database)]
  D --> E`}
        </Mermaid>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard} wrap={false}>
          <Text style={styles.cardLabel}>Flowchart — Decision Process</Text>
          <Mermaid width={220} height={250}>
            {`graph TD
  A[Feature Request] --> B{Has Spec?}
  B -->|Yes| C[Schedule]
  B -->|No| D[Write Spec]
  D --> B
  C --> E[Implement]
  E --> F{Tests Pass?}
  F -->|Yes| G[Deploy]
  F -->|No| E`}
          </Mermaid>
        </View>
        <View style={styles.halfCard} wrap={false}>
          <Text style={styles.cardLabel}>State Diagram — Order Lifecycle</Text>
          <Mermaid width={200} height={250}>
            {`stateDiagram-v2
  [*] --> Pending
  Pending --> Processing
  Processing --> Shipped
  Shipped --> Delivered
  Delivered --> [*]`}
          </Mermaid>
        </View>
      </View>

      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>CI/CD Pipeline</Text>
        <Mermaid width={460} height={70}>
          {`graph LR
  A[Push] --> B[Lint] --> C[Test] --> D[Build] --> E[Deploy]`}
        </Mermaid>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Generated with @react-pdf/mermaid</Text>
        <Text style={styles.footerText}>Powered by beautiful-mermaid</Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>
          Sequence Diagram — Authentication Flow
        </Text>
        <Mermaid width={400} height={190}>
          {`sequenceDiagram
  participant U as User
  participant A as API
  participant D as Database
  U->>A: POST /login
  A->>D: Query user
  D-->>A: User data
  A-->>U: JWT Token`}
        </Mermaid>
      </View>

      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>Class Diagram — Domain Model</Text>
        <Mermaid width={300} height={230}>
          {`classDiagram
  class User {
    +String email
    +String name
    +authenticate()
  }
  class Order {
    +Date createdAt
    +String status
    +calculate()
  }
  User "1" --> "*" Order : places`}
        </Mermaid>
      </View>

      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>ER Diagram — Data Model</Text>
        <Mermaid width={480} height={130}>
          {`erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`}
        </Mermaid>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Generated with @react-pdf/mermaid</Text>
        <Text style={styles.footerText}>Powered by beautiful-mermaid</Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.card} wrap={false}>
        <Text style={styles.cardLabel}>XY Chart — Monthly Sales</Text>
        <Mermaid width={460} height={280}>
          {`xychart-beta
  title "Monthly Sales"
  x-axis [Jan, Feb, Mar, Apr, May]
  y-axis "Revenue ($K)" 0 --> 120
  bar [30, 60, 45, 90, 110]`}
        </Mermaid>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Generated with @react-pdf/mermaid</Text>
        <Text style={styles.footerText}>Powered by beautiful-mermaid</Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'mermaid',
  name: 'Mermaid Diagrams',
  description: 'Render Mermaid diagrams using @react-pdf/mermaid',
  Document: MermaidExample,
};
