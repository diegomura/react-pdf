const BLACK = '#3E3E3E';
const RED = '#F22300';

const STEPS = [
  'Internal structures creation',
  'Resolve styles',
  'Fetching assets',
  'Layout text',
  'Wrapping pages',
  'Rendering',
];

function TimelineItem({
  step,
  position,
  children,
}: {
  step: number;
  position: 'top' | 'bottom';
  children: string;
}) {
  const top = position === 'bottom';
  return (
    <li
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <span
        style={{
          width: 0,
          height: 60,
          display: 'block',
          position: 'absolute',
          border: `1px dashed ${BLACK}`,
          top: top ? 20 : undefined,
          bottom: top ? undefined : 20,
        }}
      />
      <p
        style={{
          width: '125%',
          padding: 8,
          margin: 0,
          position: 'absolute',
          textAlign: 'center',
          borderRadius: 6,
          color: 'white',
          background: BLACK,
          top: top ? 60 : undefined,
          bottom: top ? undefined : 60,
        }}
      >
        {children}
      </p>
      <div
        style={{
          width: 45,
          height: 45,
          color: 'white',
          zIndex: 100,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          background: RED,
        }}
      >
        {step}
      </div>
    </li>
  );
}

export function OverviewTimeline() {
  return (
    <ol
      style={{
        height: 4,
        display: 'flex',
        position: 'relative',
        margin: '184px 0px',
        padding: 0,
        listStyle: 'none',
        background: BLACK,
      }}
    >
      <span
        style={{
          right: -4,
          border: '10px solid transparent',
          borderRadius: 3,
          borderRight: 0,
          borderLeft: `20px solid ${BLACK}`,
          position: 'absolute',
          top: -8,
          width: 0,
          height: 0,
          display: 'block',
        }}
      />
      {STEPS.map((label, i) => (
        <TimelineItem
          key={label}
          step={i + 1}
          position={i % 2 === 0 ? 'top' : 'bottom'}
        >
          {label}
        </TimelineItem>
      ))}
    </ol>
  );
}
