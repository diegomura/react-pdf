import { styleGroups } from '@/lib/style-props';

const slug = (name: string) => name.toLowerCase();

export function StyleProps() {
  return (
    <div className="not-prose border-fd-border divide-fd-border my-8 divide-y border-y">
      {styleGroups.map((group) => (
        <section
          key={group.name}
          id={slug(group.name)}
          className="grid scroll-mt-24 gap-x-8 gap-y-2.5 py-5 sm:grid-cols-[6.5rem_1fr]"
        >
          <div className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.08em] uppercase sm:pt-1.5">
            {group.name}
          </div>
          <ul className="flex flex-wrap items-start gap-1.5">
            {group.props.map(([name, values]) => (
              <li
                key={name}
                className="bg-fd-muted flex items-baseline gap-1.5 rounded-md px-2 py-1 font-mono text-[0.75rem] leading-5"
              >
                {name}
                {values && (
                  <span className="text-fd-muted-foreground font-sans text-[0.6875rem]">
                    {values}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
