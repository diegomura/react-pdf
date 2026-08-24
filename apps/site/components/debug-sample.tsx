const CONTENT_COLOR = '#d1e3f3';
const PADDING_COLOR = '#e2efdd';
const MARGIN_COLOR = '#fce6d0';

function Item({ color, children }: { color: string; children: string }) {
  return (
    <div style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}>
      <div
        style={{ width: 20, height: 20, marginRight: 8, background: color }}
      />
      <span>{children}</span>
    </div>
  );
}

export function DebugSample() {
  return (
    <div
      style={{
        display: 'flex',
        margin: '56px 0px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', border: `30px solid ${MARGIN_COLOR}` }}>
        <span
          style={{
            top: -48,
            left: -30,
            position: 'absolute',
            fontSize: 10,
            display: 'block',
          }}
        >
          460x370
        </span>
        <div
          style={{
            width: 400,
            height: 250,
            background: CONTENT_COLOR,
            borderTop: `30px solid ${PADDING_COLOR}`,
            borderBottom: `30px solid ${PADDING_COLOR}`,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: 200,
          marginLeft: 40,
          flexDirection: 'column',
        }}
      >
        <Item color={CONTENT_COLOR}>Content</Item>
        <Item color={PADDING_COLOR}>Padding</Item>
        <Item color={MARGIN_COLOR}>Margin</Item>
      </div>
    </div>
  );
}
