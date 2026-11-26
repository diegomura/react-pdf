import { describe, expect, test } from 'vitest';
import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { Mermaid } from '@react-pdf/mermaid';

import renderToImage from './renderComponent';

const cases = [
  {
    name: 'flowchart',
    definition: `graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[OK]
  B -->|No| D[End]`,
    pageSize: [400, 600],
  },
  {
    name: 'sequence diagram',
    definition: `sequenceDiagram
  Alice->>Bob: Hello Bob
  Bob-->>Alice: Hi Alice`,
    pageSize: [400, 300],
  },
  {
    name: 'state diagram',
    definition: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing
  Processing --> Done
  Done --> [*]`,
    pageSize: [400, 600],
  },
  {
    name: 'class diagram',
    definition: `classDiagram
  class Animal {
    +String name
    +makeSound()
  }
  class Dog {
    +fetch()
  }
  Animal <|-- Dog`,
    pageSize: [400, 500],
  },
  {
    name: 'er diagram',
    definition: `erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains`,
    pageSize: [500, 400],
  },
  {
    name: 'xychart',
    definition: `xychart-beta
  x-axis [Jan, Feb, Mar, Apr, May]
  y-axis "Revenue" 0 --> 120
  bar [30, 60, 45, 90, 110]`,
    pageSize: [800, 600],
  },
  {
    name: 'custom dimensions',
    definition: `graph LR
  A --> B --> C`,
    width: 300,
    height: 100,
    pageSize: [400, 200],
  },
];

describe('Mermaid', () => {
  test.each(cases)('$name', async ({ definition, width, height, pageSize }) => {
    const image = await renderToImage(
      <Document>
        <Page size={pageSize}>
          <View style={{ padding: 10 }}>
            <Mermaid
              {...(width != null && { width })}
              {...(height != null && { height })}
            >
              {definition}
            </Mermaid>
          </View>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
