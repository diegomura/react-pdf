import { painterGroups } from '@/lib/painter-methods';

export function PainterMethods() {
  return (
    <div className="not-prose border-fd-border divide-fd-border my-8 divide-y border-y">
      {painterGroups.map((group) => (
        <section
          key={group.name}
          className="grid gap-x-8 gap-y-2.5 py-5 sm:grid-cols-[6.5rem_1fr]"
        >
          {/* a div, not a heading: `#nd-page .prose h3` outranks any class here */}
          <div className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.08em] uppercase sm:pt-1.5">
            {group.name}
          </div>
          <ul className="flex flex-wrap items-start gap-1.5">
            {group.methods.map((method) => (
              <li
                key={method}
                className="bg-fd-muted rounded-md px-2 py-1 font-mono text-[0.75rem] leading-5"
              >
                {method}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
