/**
 * Stands in for `PdfPreviewPane` while its chunk loads: same pane, same page,
 * sized the way the viewer sizes a portrait page — the pane's padding less the
 * strip it reserves for the pager — so the swap moves nothing.
 *
 * Deliberately free of heavy imports: it ships in the chunk that waits, not
 * the one it waits for.
 */
export function PdfPreviewSkeleton() {
  return (
    <div className="bg-fd-muted flex h-[19rem] items-center justify-center p-5 sm:h-[26rem]">
      <div className="bg-fd-background/70 h-[calc(100%-2.25rem)] animate-pulse rounded-[2px] shadow-sm [aspect-ratio:1/1.4142]" />
    </div>
  );
}
