import Link from 'next/link';

export const replHref = (name?: string) =>
  name ? `/repl?example=${encodeURIComponent(name)}` : '/repl';

export function GoToExample({ name }: { name?: string }) {
  return (
    <div className="my-8 flex justify-end">
      <Link
        href={replHref(name)}
        className="rounded-md bg-fd-primary px-4 py-2 text-sm font-semibold text-fd-primary-foreground no-underline"
      >
        See it in action →
      </Link>
    </div>
  );
}
