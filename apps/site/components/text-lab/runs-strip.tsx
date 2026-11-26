'use client';

import { useState } from 'react';

type Run = {
  text: string;
  label: string;
  /** how the run actually looks once its attributes are applied */
  style: string;
  /** the underline that marks where this run starts and ends */
  edge: string;
  attributes: [string, string][];
};

const BASE: [string, string][] = [
  ['font', '[Roboto, Helvetica]'],
  ['fontSize', '12'],
  ['color', "'black'"],
  ['align', "'left'"],
];

const RUNS: Run[] = [
  {
    text: 'A ',
    label: 'run 0',
    style: '',
    edge: 'decoration-fd-muted-foreground/60',
    attributes: BASE,
  },
  {
    text: 'run',
    label: 'run 1',
    style: 'font-bold',
    edge: 'decoration-fd-primary',
    attributes: [['font', '[Roboto Bold, Helvetica]'], ...BASE.slice(1)],
  },
  {
    text: ' is the longest slice of the string that ',
    label: 'run 2',
    style: '',
    edge: 'decoration-fd-muted-foreground/25',
    attributes: BASE,
  },
  {
    text: 'agrees on everything',
    label: 'run 3',
    style: 'text-blue-700 dark:text-blue-400',
    edge: 'decoration-blue-500',
    attributes: [
      ...BASE.slice(0, 2),
      ['color', "'blue'"],
      ['underline', 'true'],
      ['underlineColor', "'blue'"],
      ['link', "'https://react-pdf.org'"],
    ],
  },
  {
    text: '. Nothing else survives the flattening.',
    label: 'run 4',
    style: '',
    edge: 'decoration-fd-muted-foreground/60',
    attributes: BASE,
  },
];

export function RunsStrip() {
  const [active, setActive] = useState(1);
  const run = RUNS[active];

  let offset = 0;
  const bounds = RUNS.map((entry) => {
    const start = offset;
    offset += entry.text.length;
    return [start, offset] as const;
  });

  return (
    <figure className="not-prose border-fd-border my-8 overflow-hidden rounded-xl border">
      <div className="bg-fd-card px-4 py-5 sm:px-5">
        <p className="text-[1.0625rem] leading-relaxed">
          {RUNS.map((entry, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              className={`focus-visible:ring-fd-ring inline cursor-pointer rounded-[3px] whitespace-pre-wrap underline decoration-2 underline-offset-[6px] outline-none focus-visible:ring-2 ${entry.style} ${entry.edge} ${
                active === index ? 'bg-fd-muted' : ''
              }`}
            >
              {entry.text}
            </button>
          ))}
        </p>
      </div>

      <div className="border-fd-border bg-fd-muted border-t px-4 py-3 font-mono text-[0.75rem]">
        <div className="text-fd-muted-foreground mb-2">
          {run.label} · characters {bounds[active][0]}–{bounds[active][1]}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {run.attributes.map(([key, value]) => (
            <span key={key}>
              <span className="text-fd-muted-foreground">{key}: </span>
              {value}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
