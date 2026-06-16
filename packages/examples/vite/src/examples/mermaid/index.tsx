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
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 4,
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

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Generated with @react-pdf/mermaid</Text>
    <Text style={styles.footerText}>Powered by beautiful-mermaid</Text>
  </View>
);

const Card = ({
  label,
  children,
  wrap = false,
}: {
  label: string;
  children: React.ReactNode;
  wrap?: boolean;
}) => (
  <View style={styles.card} wrap={wrap}>
    <Text style={styles.cardLabel}>{label}</Text>
    {children}
  </View>
);

const HalfCard = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.halfCard} wrap={false}>
    <Text style={styles.cardLabel}>{label}</Text>
    {children}
  </View>
);

const MermaidExample = () => (
  <Document>
    {/* ============================================================
        FLOWCHART EXAMPLES — Page 1
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Mermaid Diagrams</Text>
      <Text style={styles.subtitle}>
        Diagrams rendered as vector graphics via @react-pdf/mermaid
      </Text>
      <Text style={styles.sectionTitle}>Flowcharts</Text>

      {/* 1. Simple Flow */}
      <Card label="1 · Simple Flow">
        <Mermaid width={300} height={80}>
          {`graph TD
  A[Start] --> B[Process] --> C[End]`}
        </Mermaid>
      </Card>

      {/* 2. Original Node Shapes */}
      <Card label="2 · Original Node Shapes">
        <Mermaid width={460} height={80}>
          {`graph LR
  A[Rectangle] --> B(Rounded)
  B --> C{Diamond}
  C --> D([Stadium])
  D --> E((Circle))`}
        </Mermaid>
      </Card>

      {/* 3. Batch 1 Shapes */}
      <Card label="3 · Batch 1 Shapes">
        <Mermaid width={350} height={80}>
          {`graph LR
  A[[Subroutine]] --> B(((Double Circle)))
  B --> C{{Hexagon}}`}
        </Mermaid>
      </Card>

      {/* 4. Batch 2 Shapes */}
      <Card label="4 · Batch 2 Shapes">
        <Mermaid width={460} height={80}>
          {`graph LR
  A[(Database)] --> B>Flag Shape]
  B --> C[/Wider Bottom\\]
  C --> D[\\Wider Top/]`}
        </Mermaid>
      </Card>

      {/* 5. All 12 Flowchart Shapes */}
      <Card label="5 · All 12 Flowchart Shapes">
        <Mermaid width={460} height={120}>
          {`graph LR
  A[Rectangle] --> B(Rounded)
  B --> C{Diamond}
  C --> D([Stadium])
  D --> E((Circle))
  E --> F[[Subroutine]]
  F --> G(((Double Circle)))
  G --> H{{Hexagon}}
  H --> I[(Database)]
  I --> J>Flag]
  J --> K[/Trapezoid\\]
  K --> L[\\Inverse Trap/]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        FLOWCHART EXAMPLES — Page 2
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Flowcharts (continued)</Text>

      {/* 6. All Edge Styles */}
      <View style={styles.row}>
        <HalfCard label="6 · All Edge Styles">
          <Mermaid width={200} height={150}>
            {`graph TD
  A[Source] -->|solid| B[Target 1]
  A -.->|dotted| C[Target 2]
  A ==>|thick| D[Target 3]`}
          </Mermaid>
        </HalfCard>

        {/* 7. No-Arrow Edges */}
        <HalfCard label="7 · No-Arrow Edges">
          <Mermaid width={200} height={150}>
            {`graph TD
  A[Node 1] ---|related| B[Node 2]
  B -.- C[Node 3]
  C === D[Node 4]`}
          </Mermaid>
        </HalfCard>
      </View>

      {/* 8. Text-Embedded Labels */}
      <Card label="8 · Text-Embedded Labels">
        <Mermaid width={350} height={150}>
          {`flowchart TD
  A(Start) --> B{Is it sunny?}
  B -- Yes --> C[Go to the park]
  B -- No --> D[Stay indoors]
  C --> E[Finish]
  D --> E`}
        </Mermaid>
      </Card>

      {/* 9. Bidirectional Arrows */}
      <Card label="9 · Bidirectional Arrows">
        <Mermaid width={460} height={80}>
          {`graph LR
  A[Client] <-->|sync| B[Server]
  B <-.->|heartbeat| C[Monitor]
  C <==>|data| D[Storage]`}
        </Mermaid>
      </Card>

      {/* 10. Parallel Links (&) */}
      <Card label="10 · Parallel Links (&)">
        <Mermaid width={300} height={120}>
          {`graph TD
  A[Input] & B[Config] --> C[Processor]
  C --> D[Output] & E[Log]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        FLOWCHART EXAMPLES — Page 3
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Flowcharts (continued)</Text>

      {/* 11. Chained Edges */}
      <Card label="11 · Chained Edges">
        <Mermaid width={460} height={70}>
          {`graph LR
  A[Step 1] --> B[Step 2] --> C[Step 3] --> D[Step 4] --> E[Step 5]`}
        </Mermaid>
      </Card>

      {/* 12. linkStyle: Color-Coded Edges */}
      <Card label="12 · linkStyle: Color-Coded Edges">
        <Mermaid width={350} height={180}>
          {`graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Accept]
  B -->|No| D[Reject]
  C --> E[Done]
  D --> E
  linkStyle 0 stroke:#7aa2f7,stroke-width:3px
  linkStyle 1 stroke:#9ece6a,stroke-width:2px
  linkStyle 2 stroke:#f7768e,stroke-width:2px
  linkStyle default stroke:#565f89`}
        </Mermaid>
      </Card>

      {/* 13. linkStyle: Default + Override */}
      <Card label="13 · linkStyle: Default + Override">
        <Mermaid width={460} height={80}>
          {`graph LR
  A[Request] --> B[Auth]
  B --> C[Process]
  C --> D[Response]
  B --> E[Reject]
  linkStyle default stroke:#6b7280,stroke-width:1px
  linkStyle 0,1,2 stroke:#22c55e,stroke-width:2px
  linkStyle 3 stroke:#ef4444,stroke-width:3px`}
        </Mermaid>
      </Card>

      {/* 14. Direction: Left-Right (LR) */}
      <Card label="14 · Direction: Left-Right (LR)">
        <Mermaid width={350} height={70}>
          {`graph LR
  A[Input] --> B[Transform] --> C[Output]`}
        </Mermaid>
      </Card>

      {/* 15. Direction: Bottom-Top (BT) */}
      <Card label="15 · Direction: Bottom-Top (BT)">
        <Mermaid width={200} height={150}>
          {`graph BT
  A[Foundation] --> B[Layer 2] --> C[Top]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        FLOWCHART EXAMPLES — Page 4: Subgraphs
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Flowcharts — Subgraphs</Text>

      {/* 16. Subgraphs */}
      <Card label="16 · Subgraphs">
        <Mermaid width={400} height={150}>
          {`graph TD
  subgraph Frontend
    A[React App] --> B[State Manager]
  end
  subgraph Backend
    C[API Server] --> D[Database]
  end
  B --> C`}
        </Mermaid>
      </Card>

      {/* 17. Nested Subgraphs */}
      <Card label="17 · Nested Subgraphs">
        <Mermaid width={460} height={180}>
          {`graph TD
  subgraph Cloud
    subgraph us-east [US East Region]
      A[Web Server] --> B[App Server]
    end
    subgraph us-west [US West Region]
      C[Web Server] --> D[App Server]
    end
  end
  E[Load Balancer] --> A
  E --> C`}
        </Mermaid>
      </Card>

      {/* 18. Subgraph Direction Override */}
      <Card label="18 · Subgraph Direction Override">
        <Mermaid width={460} height={120}>
          {`graph TD
  subgraph pipeline [Processing Pipeline]
    direction LR
    A[Input] --> B[Parse] --> C[Transform] --> D[Output]
  end
  E[Source] --> A
  D --> F[Sink]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        FLOWCHART EXAMPLES — Page 5: Styling & Classes
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Flowcharts — Styling</Text>

      {/* 19. ::: Class Shorthand */}
      <Card label="19 · ::: Class Shorthand">
        <Mermaid width={350} height={100}>
          {`graph TD
  A[Normal]:::default --> B[Highlighted]:::highlight --> C[Error]:::error
  classDef default fill:#f4f4f5,stroke:#a1a1aa
  classDef highlight fill:#fbbf24,stroke:#d97706
  classDef error fill:#ef4444,stroke:#dc2626`}
        </Mermaid>
      </Card>

      {/* 20. Inline Style Overrides */}
      <Card label="20 · Inline Style Overrides">
        <Mermaid width={350} height={100}>
          {`graph TD
  A[Default] --> B[Custom Colors] --> C[Another Custom]
  style B fill:#3b82f6,stroke:#1d4ed8,color:#ffffff
  style C fill:#10b981,stroke:#059669`}
        </Mermaid>
      </Card>

      {/* 21. CI/CD Pipeline */}
      <Card label="21 · CI/CD Pipeline">
        <Mermaid width={400} height={220}>
          {`graph TD
  subgraph ci [CI Pipeline]
    A[Push Code] --> B{Tests Pass?}
    B -->|Yes| C[Build Image]
    B -->|No| D[Fix & Retry]
    D -.-> A
  end
  C --> E([Deploy Staging])
  E --> F{QA Approved?}
  F -->|Yes| G((Production))
  F -->|No| D`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        FLOWCHART EXAMPLES — Page 6: Real-World Flowcharts
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Flowcharts — Real-World</Text>

      {/* 22. System Architecture */}
      <Card label="22 · System Architecture">
        <Mermaid width={460} height={180}>
          {`graph LR
  subgraph clients [Client Layer]
    A([Web App]) --> B[API Gateway]
    C([Mobile App]) --> B
  end
  subgraph services [Service Layer]
    B --> D[Auth Service]
    B --> E[User Service]
    B --> F[Order Service]
  end
  subgraph data [Data Layer]
    D --> G[(Auth DB)]
    E --> H[(User DB)]
    F --> I[(Order DB)]
    F --> J([Message Queue])
  end`}
        </Mermaid>
      </Card>

      {/* 23. Decision Tree */}
      <Card label="23 · Decision Tree">
        <Mermaid width={400} height={200}>
          {`graph TD
  A{Is it raining?} -->|Yes| B{Have umbrella?}
  A -->|No| C([Go outside])
  B -->|Yes| D([Go with umbrella])
  B -->|No| E{Is it heavy?}
  E -->|Yes| F([Stay inside])
  E -->|No| G([Run for it])`}
        </Mermaid>
      </Card>

      {/* 24. Git Branching Workflow */}
      <Card label="24 · Git Branching Workflow">
        <Mermaid width={460} height={150}>
          {`graph LR
  A[main] --> B[develop]
  B --> C[feature/auth]
  B --> D[feature/ui]
  C --> E{PR Review}
  D --> E
  E -->|approved| B
  B --> F[release/1.0]
  F --> G{Tests?}
  G -->|pass| A
  G -->|fail| F`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        STATE DIAGRAM EXAMPLES — Page 7
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>State Diagrams</Text>

      {/* 25. Basic State Diagram */}
      <Card label="25 · Basic State Diagram">
        <Mermaid width={350} height={180}>
          {`stateDiagram-v2
  [*] --> Idle
  Idle --> Active : start
  Active --> Idle : cancel
  Active --> Done : complete
  Done --> [*]`}
        </Mermaid>
      </Card>

      {/* 26. Composite States */}
      <Card label="26 · Composite States">
        <Mermaid width={400} height={220}>
          {`stateDiagram-v2
  [*] --> Idle
  Idle --> Processing : submit
  state Processing {
    parse --> validate
    validate --> execute
  }
  Processing --> Complete : done
  Processing --> Error : fail
  Error --> Idle : retry
  Complete --> [*]`}
        </Mermaid>
      </Card>

      {/* 27. Connection Lifecycle */}
      <Card label="27 · Connection Lifecycle">
        <Mermaid width={460} height={200}>
          {`stateDiagram-v2
  [*] --> Closed
  Closed --> Connecting : connect
  Connecting --> Connected : success
  Connecting --> Closed : timeout
  Connected --> Disconnecting : close
  Connected --> Reconnecting : error
  Reconnecting --> Connected : success
  Reconnecting --> Closed : max_retries
  Disconnecting --> Closed : done
  Closed --> [*]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        STATE DIAGRAM + SEQUENCE — Page 8
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      {/* 28. CJK State Names */}
      <Card label="28 · CJK State Names">
        <Mermaid width={350} height={180}>
          {`stateDiagram-v2
  [*] --> 空闲
  空闲 --> 处理中 : 提交
  处理中 --> 完成 : 成功
  处理中 --> 错误 : 失败
  错误 --> 空闲 : 重试
  完成 --> [*]`}
        </Mermaid>
      </Card>

      <Text style={styles.sectionTitle}>Sequence Diagrams</Text>

      {/* 29. Basic Messages */}
      <Card label="29 · Basic Messages">
        <Mermaid width={300} height={120}>
          {`sequenceDiagram
  Alice->>Bob: Hello Bob!
  Bob-->>Alice: Hi Alice!`}
        </Mermaid>
      </Card>

      {/* 30. Participant Aliases */}
      <Card label="30 · Participant Aliases">
        <Mermaid width={350} height={140}>
          {`sequenceDiagram
  participant A as Alice
  participant B as Bob
  participant C as Charlie
  A->>B: Hello
  B->>C: Forward
  C-->>A: Reply`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 9
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 31. Actor Stick Figures */}
      <Card label="31 · Actor Stick Figures">
        <Mermaid width={350} height={160}>
          {`sequenceDiagram
  actor U as User
  participant S as System
  participant DB as Database
  U->>S: Click button
  S->>DB: Query
  DB-->>S: Results
  S-->>U: Display`}
        </Mermaid>
      </Card>

      {/* 32. Arrow Types */}
      <Card label="32 · Arrow Types">
        <Mermaid width={300} height={160}>
          {`sequenceDiagram
  A->>B: Solid arrow (sync)
  B-->>A: Dashed arrow (return)
  A-)B: Open arrow (async)
  B--)A: Open dashed arrow`}
        </Mermaid>
      </Card>

      {/* 33. Activation Boxes */}
      <Card label="33 · Activation Boxes">
        <Mermaid width={300} height={160}>
          {`sequenceDiagram
  participant C as Client
  participant S as Server
  C->>+S: Request
  S->>+S: Process
  S->>-S: Done
  S-->>-C: Response`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 10
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 34. Self-Messages */}
      <Card label="34 · Self-Messages">
        <Mermaid width={200} height={140}>
          {`sequenceDiagram
  participant S as Server
  S->>S: Internal process
  S->>S: Validate
  S-->>S: Log`}
        </Mermaid>
      </Card>

      {/* 35. Loop Block */}
      <Card label="35 · Loop Block">
        <Mermaid width={300} height={180}>
          {`sequenceDiagram
  participant C as Client
  participant S as Server
  C->>S: Connect
  loop Every 30s
    C->>S: Heartbeat
    S-->>C: Ack
  end
  C->>S: Disconnect`}
        </Mermaid>
      </Card>

      {/* 36. Alt/Else Block */}
      <Card label="36 · Alt/Else Block">
        <Mermaid width={350} height={200}>
          {`sequenceDiagram
  participant C as Client
  participant S as Server
  C->>S: Login
  alt Valid credentials
    S-->>C: 200 OK
  else Invalid
    S-->>C: 401 Unauthorized
  else Account locked
    S-->>C: 403 Forbidden
  end`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 11
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 37. Opt Block */}
      <Card label="37 · Opt Block">
        <Mermaid width={400} height={200}>
          {`sequenceDiagram
  participant A as App
  participant C as Cache
  participant DB as Database
  A->>C: Get data
  C-->>A: Cache miss
  opt Cache miss
    A->>DB: Query
    DB-->>A: Results
    A->>C: Store in cache
  end`}
        </Mermaid>
      </Card>

      {/* 38. Par Block */}
      <Card label="38 · Par Block">
        <Mermaid width={460} height={200}>
          {`sequenceDiagram
  participant C as Client
  participant A as AuthService
  participant U as UserService
  participant O as OrderService
  C->>A: Authenticate
  par Fetch user data
    A->>U: Get profile
  and Fetch orders
    A->>O: Get orders
  end
  A-->>C: Combined response`}
        </Mermaid>
      </Card>

      {/* 39. Critical Block */}
      <Card label="39 · Critical Block">
        <Mermaid width={300} height={170}>
          {`sequenceDiagram
  participant A as App
  participant DB as Database
  A->>DB: BEGIN
  critical Transaction
    A->>DB: UPDATE accounts
    A->>DB: INSERT log
  end
  A->>DB: COMMIT`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 12
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 40. Notes (Right/Left/Over) */}
      <Card label="40 · Notes (Right/Left/Over)">
        <Mermaid width={350} height={180}>
          {`sequenceDiagram
  participant A as Alice
  participant B as Bob
  Note left of A: Alice prepares
  A->>B: Hello
  Note right of B: Bob thinks
  B-->>A: Reply
  Note over A,B: Conversation complete`}
        </Mermaid>
      </Card>

      {/* 41. OAuth 2.0 Flow */}
      <Card label="41 · OAuth 2.0 Flow">
        <Mermaid width={460} height={300}>
          {`sequenceDiagram
  actor U as User
  participant App as Client App
  participant Auth as Auth Server
  participant API as Resource API
  U->>App: Click Login
  App->>Auth: Authorization request
  Auth->>U: Login page
  U->>Auth: Credentials
  Auth-->>App: Authorization code
  App->>Auth: Exchange code for token
  Auth-->>App: Access token
  App->>API: Request + token
  API-->>App: Protected resource
  App-->>U: Display data`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 13
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 42. Database Transaction */}
      <Card label="42 · Database Transaction">
        <Mermaid width={400} height={260}>
          {`sequenceDiagram
  participant C as Client
  participant S as Server
  participant DB as Database
  C->>S: POST /transfer
  S->>DB: BEGIN
  S->>DB: Debit account A
  alt Success
    S->>DB: Credit account B
    S->>DB: INSERT audit_log
    S->>DB: COMMIT
    S-->>C: 200 OK
  else Insufficient funds
    S->>DB: ROLLBACK
    S-->>C: 400 Bad Request
  end`}
        </Mermaid>
      </Card>

      {/* 43. Microservice Orchestration */}
      <Card label="43 · Microservice Orchestration">
        <Mermaid width={460} height={250}>
          {`sequenceDiagram
  participant G as Gateway
  participant A as Auth
  participant U as Users
  participant O as Orders
  participant N as Notify
  G->>A: Validate token
  A-->>G: Valid
  par Fetch data
    G->>U: Get user
    U-->>G: User data
  and
    G->>O: Get orders
    O-->>G: Order list
  end
  G->>N: Send notification
  N-->>G: Queued
  Note over G: Aggregate response`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        SEQUENCE DIAGRAMS — Page 14
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Sequence Diagrams (continued)</Text>

      {/* 44. Self-Messages with Notes */}
      <Card label="44 · Self-Messages with Notes">
        <Mermaid width={460} height={380}>
          {`sequenceDiagram
  participant User
  participant Main as Main Process
  participant Renderer
  participant Timer as 3s Fallback Timer
  User->>Main: CMD+W
  Main->>Main: event.preventDefault()
  Main->>Renderer: WINDOW_CLOSE_REQUESTED
  Main->>Timer: Start 3s timer
  alt Multiple panels
    Renderer->>Renderer: closePanel(focusedId)
    Note over Renderer: Panel removed
    Note over Renderer: No confirmCloseWindow!
    Timer-->>Main: 3s elapsed → window.destroy()
  else Single panel
    Renderer->>Renderer: closePanel(lastId)
    Note over Renderer: Stack becomes []
    Renderer->>Renderer: Auto-select fires → new panel created!
    Note over Renderer: Panel reopens
    Timer-->>Main: 3s elapsed → window.destroy()
  end`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        CLASS DIAGRAMS — Page 15
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Class Diagrams</Text>

      {/* 45. Basic Class */}
      <View style={styles.row}>
        <HalfCard label="45 · Basic Class">
          <Mermaid width={200} height={140}>
            {`classDiagram
  class Animal {
    +String name
    +int age
    +eat() void
    +sleep() void
  }`}
          </Mermaid>
        </HalfCard>

        {/* 46. Visibility Markers */}
        <HalfCard label="46 · Visibility Markers">
          <Mermaid width={220} height={200}>
            {`classDiagram
  class User {
    +String name
    -String password
    #int internalId
    ~String packageField
    +login() bool
    -hashPassword() String
    #validate() void
    ~notify() void
  }`}
          </Mermaid>
        </HalfCard>
      </View>

      {/* 47–49 in a row */}
      <View style={styles.row}>
        <HalfCard label="47 · Interface Annotation">
          <Mermaid width={200} height={120}>
            {`classDiagram
  class Serializable {
    <<interface>>
    +serialize() String
    +deserialize(data) void
  }`}
          </Mermaid>
        </HalfCard>

        <HalfCard label="48 · Abstract Annotation">
          <Mermaid width={200} height={120}>
            {`classDiagram
  class Shape {
    <<abstract>>
    +String color
    +area() double
    +draw() void
  }`}
          </Mermaid>
        </HalfCard>
      </View>

      {/* 49. Enum Annotation */}
      <Card label="49 · Enum Annotation">
        <Mermaid width={200} height={140}>
          {`classDiagram
  class Status {
    <<enumeration>>
    ACTIVE
    INACTIVE
    PENDING
    DELETED
  }`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        CLASS DIAGRAMS — Page 16: Relationships
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Class Diagrams — Relationships</Text>

      {/* 50. Inheritance */}
      <Card label="50 · Inheritance (<|--)">
        <Mermaid width={350} height={160}>
          {`classDiagram
  class Animal {
    +String name
    +eat() void
  }
  class Dog {
    +String breed
    +bark() void
  }
  class Cat {
    +bool isIndoor
    +meow() void
  }
  Animal <|-- Dog
  Animal <|-- Cat`}
        </Mermaid>
      </Card>

      {/* 51–52 in a row */}
      <View style={styles.row}>
        <HalfCard label="51 · Composition (*--)">
          <Mermaid width={200} height={120}>
            {`classDiagram
  class Car {
    +String model
    +start() void
  }
  class Engine {
    +int horsepower
    +rev() void
  }
  Car *-- Engine`}
          </Mermaid>
        </HalfCard>

        <HalfCard label="52 · Aggregation (o--)">
          <Mermaid width={200} height={120}>
            {`classDiagram
  class University {
    +String name
  }
  class Department {
    +String faculty
  }
  University o-- Department`}
          </Mermaid>
        </HalfCard>
      </View>

      {/* 53–54 in a row */}
      <View style={styles.row}>
        <HalfCard label="53 · Association (-->)">
          <Mermaid width={200} height={100}>
            {`classDiagram
  class Customer {
    +String name
  }
  class Order {
    +int orderId
  }
  Customer --> Order`}
          </Mermaid>
        </HalfCard>

        <HalfCard label="54 · Dependency (..>)">
          <Mermaid width={200} height={100}>
            {`classDiagram
  class Service {
    +process() void
  }
  class Repository {
    +find() Object
  }
  Service ..> Repository`}
          </Mermaid>
        </HalfCard>
      </View>

      <Footer />
    </Page>

    {/* ============================================================
        CLASS DIAGRAMS — Page 17
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Class Diagrams (continued)</Text>

      {/* 55. Realization */}
      <Card label="55 · Realization (..|>)">
        <Mermaid width={250} height={120}>
          {`classDiagram
  class Flyable {
    <<interface>>
    +fly() void
  }
  class Bird {
    +fly() void
    +sing() void
  }
  Bird ..|> Flyable`}
        </Mermaid>
      </Card>

      {/* 56. All 6 Relationship Types */}
      <Card label="56 · All 6 Relationship Types">
        <Mermaid width={350} height={180}>
          {`classDiagram
  A <|-- B : inheritance
  C *-- D : composition
  E o-- F : aggregation
  G --> H : association
  I ..> J : dependency
  K ..|> L : realization`}
        </Mermaid>
      </Card>

      {/* 57. Relationship Labels */}
      <Card label="57 · Relationship Labels">
        <Mermaid width={350} height={150}>
          {`classDiagram
  class Teacher {
    +String name
  }
  class Student {
    +String name
  }
  class Course {
    +String title
  }
  Teacher --> Course : teaches
  Student --> Course : enrolled in`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        CLASS DIAGRAMS — Page 18: Patterns
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Class Diagrams — Patterns</Text>

      {/* 58. Design Pattern — Observer */}
      <Card label="58 · Design Pattern — Observer">
        <Mermaid width={460} height={250}>
          {`classDiagram
  class Subject {
    <<interface>>
    +attach(Observer) void
    +detach(Observer) void
    +notify() void
  }
  class Observer {
    <<interface>>
    +update() void
  }
  class EventEmitter {
    -List~Observer~ observers
    +attach(Observer) void
    +detach(Observer) void
    +notify() void
  }
  class Logger {
    +update() void
  }
  class Alerter {
    +update() void
  }
  Subject <|.. EventEmitter
  Observer <|.. Logger
  Observer <|.. Alerter
  EventEmitter --> Observer`}
        </Mermaid>
      </Card>

      {/* 59. MVC Architecture */}
      <Card label="59 · MVC Architecture">
        <Mermaid width={400} height={200}>
          {`classDiagram
  class Model {
    -data Map
    +getData() Map
    +setData(key, val) void
    +notify() void
  }
  class View {
    -model Model
    +render() void
    +update() void
  }
  class Controller {
    -model Model
    -view View
    +handleInput(event) void
    +updateModel(data) void
  }
  Controller --> Model : updates
  Controller --> View : refreshes
  View --> Model : reads
  Model ..> View : notifies`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        CLASS DIAGRAMS — Page 19: Full Hierarchy
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Class Diagrams (continued)</Text>

      {/* 60. Full Hierarchy */}
      <Card label="60 · Full Hierarchy">
        <Mermaid width={400} height={350}>
          {`classDiagram
  class Animal {
    <<abstract>>
    +String name
    +int age
    +eat() void
    +sleep() void
  }
  class Mammal {
    +bool warmBlooded
    +nurse() void
  }
  class Bird {
    +bool canFly
    +layEggs() void
  }
  class Dog {
    +String breed
    +bark() void
  }
  class Cat {
    +bool isIndoor
    +purr() void
  }
  class Parrot {
    +String vocabulary
    +speak() void
  }
  Animal <|-- Mammal
  Animal <|-- Bird
  Mammal <|-- Dog
  Mammal <|-- Cat
  Bird <|-- Parrot`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        ER DIAGRAMS — Page 20
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>ER Diagrams</Text>

      {/* 61. Basic Relationship */}
      <Card label="61 · Basic Relationship">
        <Mermaid width={350} height={80}>
          {`erDiagram
  CUSTOMER ||--o{ ORDER : places`}
        </Mermaid>
      </Card>

      {/* 62. Entity with Attributes */}
      <Card label="62 · Entity with Attributes">
        <Mermaid width={250} height={130}>
          {`erDiagram
  CUSTOMER {
    int id PK
    string name
    string email UK
    date created_at
  }`}
        </Mermaid>
      </Card>

      {/* 63. Attribute Keys (PK, FK, UK) */}
      <Card label="63 · Attribute Keys (PK, FK, UK)">
        <Mermaid width={280} height={160}>
          {`erDiagram
  ORDER {
    int id PK
    int customer_id FK
    string invoice_number UK
    decimal total
    date order_date
    string status
  }`}
        </Mermaid>
      </Card>

      {/* 64–65 in a row */}
      <View style={styles.row}>
        <HalfCard label="64 · One-to-One (||--||)">
          <Mermaid width={220} height={70}>
            {`erDiagram
  PERSON ||--|| PASSPORT : has`}
          </Mermaid>
        </HalfCard>

        <HalfCard label="65 · One-to-Many (||--o{)">
          <Mermaid width={220} height={70}>
            {`erDiagram
  CUSTOMER ||--o{ ORDER : places`}
          </Mermaid>
        </HalfCard>
      </View>

      {/* 66–67 in a row */}
      <View style={styles.row}>
        <HalfCard label="66 · Opt-to-Many (|o--|{)">
          <Mermaid width={220} height={70}>
            {`erDiagram
  SUPERVISOR |o--|{ EMPLOYEE : manages`}
          </Mermaid>
        </HalfCard>

        <HalfCard label="67 · Many-to-Many (}|--o{)">
          <Mermaid width={220} height={70}>
            {`erDiagram
  TEACHER }|--o{ COURSE : teaches`}
          </Mermaid>
        </HalfCard>
      </View>

      <Footer />
    </Page>

    {/* ============================================================
        ER DIAGRAMS — Page 21
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>ER Diagrams (continued)</Text>

      {/* 68. All Cardinality Types */}
      <Card label="68 · All Cardinality Types">
        <Mermaid width={400} height={140}>
          {`erDiagram
  A ||--|| B : one-to-one
  C ||--o{ D : one-to-many
  E |o--|{ F : opt-to-many
  G }|--o{ H : many-to-many`}
        </Mermaid>
      </Card>

      {/* 69. Identifying (Solid) Relationship */}
      <Card label="69 · Identifying (Solid) Relationship">
        <Mermaid width={350} height={80}>
          {`erDiagram
  ORDER ||--|{ LINE_ITEM : contains`}
        </Mermaid>
      </Card>

      {/* 70. Non-Identifying (Dashed) Relationship */}
      <Card label="70 · Non-Identifying (Dashed) Relationship">
        <Mermaid width={400} height={100}>
          {`erDiagram
  USER ||..o{ LOG_ENTRY : generates
  USER ||..o{ SESSION : opens`}
        </Mermaid>
      </Card>

      {/* 71. Mixed Identifying & Non-Identifying */}
      <Card label="71 · Mixed Identifying & Non-Identifying">
        <Mermaid width={460} height={130}>
          {`erDiagram
  ORDER ||--|{ LINE_ITEM : contains
  ORDER ||..o{ SHIPMENT : ships-via
  PRODUCT ||--o{ LINE_ITEM : includes
  PRODUCT ||..o{ REVIEW : receives`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        ER DIAGRAMS — Page 22: Real-World Schemas
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>ER Diagrams — Real-World Schemas</Text>

      {/* 72. E-Commerce Schema */}
      <Card label="72 · E-Commerce Schema">
        <Mermaid width={460} height={200}>
          {`erDiagram
  CUSTOMER {
    int id PK
    string name
    string email UK
  }
  ORDER {
    int id PK
    date created
    int customer_id FK
  }
  PRODUCT {
    int id PK
    string name
    float price
  }
  LINE_ITEM {
    int id PK
    int order_id FK
    int product_id FK
    int quantity
  }
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE_ITEM : contains
  PRODUCT ||--o{ LINE_ITEM : includes`}
        </Mermaid>
      </Card>

      {/* 73. Blog Platform Schema */}
      <Card label="73 · Blog Platform Schema">
        <Mermaid width={460} height={250}>
          {`erDiagram
  USER {
    int id PK
    string username UK
    string email UK
    date joined
  }
  POST {
    int id PK
    string title
    text content
    int author_id FK
    date published
  }
  COMMENT {
    int id PK
    text body
    int post_id FK
    int user_id FK
    date created
  }
  TAG {
    int id PK
    string name UK
  }
  USER ||--o{ POST : writes
  USER ||--o{ COMMENT : authors
  POST ||--o{ COMMENT : has
  POST }|--o{ TAG : tagged-with`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        ER DIAGRAMS — Page 23
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>ER Diagrams (continued)</Text>

      {/* 74. School Management Schema */}
      <Card label="74 · School Management Schema">
        <Mermaid width={460} height={250}>
          {`erDiagram
  STUDENT {
    int id PK
    string name
    date dob
    string grade
  }
  TEACHER {
    int id PK
    string name
    string department
  }
  COURSE {
    int id PK
    string title
    int teacher_id FK
    int credits
  }
  ENROLLMENT {
    int id PK
    int student_id FK
    int course_id FK
    string semester
    float grade
  }
  TEACHER ||--o{ COURSE : teaches
  STUDENT ||--o{ ENROLLMENT : enrolled
  COURSE ||--o{ ENROLLMENT : has`}
        </Mermaid>
      </Card>

      <Text style={styles.sectionTitle}>XY Charts</Text>

      {/* 75. Simple Bar Chart */}
      <Card label="75 · Simple Bar Chart">
        <Mermaid width={400} height={250}>
          {`xychart-beta
    title "Product Sales"
    x-axis [Widgets, Gadgets, Gizmos, Doodads, Thingamajigs]
    bar [150, 230, 180, 95, 310]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        XY CHART EXAMPLES — Page 24
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>XY Charts (continued)</Text>

      {/* 76. Line Chart */}
      <Card label="76 · Line Chart">
        <Mermaid width={460} height={250}>
          {`xychart-beta
    title "Revenue Growth"
    x-axis [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
    line [320, 420, 540, 680, 820, 950, 1080, 1200]`}
        </Mermaid>
      </Card>

      {/* 77. Bar and Line Overlay */}
      <Card label="77 · Bar and Line Overlay">
        <Mermaid width={460} height={280}>
          {`xychart-beta
    title "Monthly Revenue"
    x-axis "Month" [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
    y-axis "Revenue (USD)" 0 --> 10000
    bar [4200, 5000, 5800, 6200, 5500, 7000, 7800, 7200, 8400, 8100, 9000, 9200]
    line [4200, 5000, 5800, 6200, 5500, 7000, 7800, 7200, 8400, 8100, 9000, 9200]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        XY CHART EXAMPLES — Page 25
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>XY Charts (continued)</Text>

      {/* 78. Horizontal Bars */}
      <Card label="78 · Horizontal Bars">
        <Mermaid width={400} height={250}>
          {`xychart-beta horizontal
    title "Language Popularity"
    x-axis [Python, JavaScript, Java, Go, Rust]
    bar [30, 25, 20, 12, 8]`}
        </Mermaid>
      </Card>

      {/* 79. Multiple Bar Series */}
      <Card label="79 · Multiple Bar Series">
        <Mermaid width={400} height={250}>
          {`xychart-beta
    title "2023 vs 2024 Sales"
    x-axis [Q1, Q2, Q3, Q4]
    bar [200, 250, 300, 280]
    bar [230, 280, 320, 350]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        XY CHART EXAMPLES — Page 26
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>XY Charts (continued)</Text>

      {/* 80. Dual Lines */}
      <Card label="80 · Dual Lines">
        <Mermaid width={460} height={250}>
          {`xychart-beta
    title "Planned vs Actual"
    x-axis [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug]
    line [100, 145, 190, 240, 280, 320, 360, 400]
    line [90, 130, 185, 235, 275, 340, 380, 420]`}
        </Mermaid>
      </Card>

      {/* 81. Numeric X-Axis */}
      <Card label="81 · Numeric X-Axis">
        <Mermaid width={460} height={250}>
          {`xychart-beta
    title "Distribution Curve"
    x-axis 0 --> 100
    line [4, 7, 13, 21, 31, 43, 58, 71, 84, 91, 95, 91, 84, 71, 58, 43, 31, 21, 13, 7, 4]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        XY CHART EXAMPLES — Page 27
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>XY Charts (continued)</Text>

      {/* 82. 12-Month Dataset */}
      <Card label="82 · 12-Month Dataset">
        <Mermaid width={460} height={280}>
          {`xychart-beta
    title "Monthly Active Users (2024)"
    x-axis [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
    y-axis "Users" 0 --> 30000
    bar [12000, 13500, 15200, 16800, 18500, 20100, 19800, 21500, 23000, 24200, 25800, 28000]
    line [12000, 13500, 15200, 16800, 18500, 20100, 19800, 21500, 23000, 24200, 25800, 28000]`}
        </Mermaid>
      </Card>

      {/* 83. Horizontal Combined */}
      <Card label="83 · Horizontal Combined">
        <Mermaid width={460} height={280}>
          {`xychart-beta horizontal
    title "Budget vs Actual"
    x-axis [Eng, Sales, Marketing, Product, Ops, HR, Finance, Legal]
    bar [500, 350, 250, 200, 150, 120, 100, 80]
    line [480, 380, 230, 180, 160, 110, 95, 75]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>

    {/* ============================================================
        XY CHART EXAMPLES — Page 28
        ============================================================ */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>XY Charts (continued)</Text>

      {/* 84. Sprint Burndown */}
      <Card label="84 · Sprint Burndown">
        <Mermaid width={460} height={280}>
          {`xychart-beta
    title "Sprint Burndown"
    x-axis [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10]
    y-axis "Story Points" 0 --> 80
    line [72, 65, 58, 50, 45, 38, 30, 22, 12, 0]
    line [72, 65, 58, 50, 43, 36, 29, 22, 14, 0]`}
        </Mermaid>
      </Card>

      <Footer />
    </Page>
  </Document>
);

export default {
  id: 'mermaid',
  name: 'Mermaid Diagrams',
  description: 'Render Mermaid diagrams using @react-pdf/mermaid',
  Document: MermaidExample,
};
