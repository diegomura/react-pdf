import path from 'path';
import url from 'url';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';

// Text must rasterize identically on every platform or the image snapshots
// drift; register a bundled font instead of resolving a system one.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
GlobalFonts.registerFromPath(
  path.join(__dirname, 'assets', 'font.ttf'),
  'SnapshotFont',
);

const PALETTE = [
  '#fde68a',
  '#bae6fd',
  '#bbf7d0',
  '#fecaca',
  '#ddd6fe',
  '#fed7aa',
  '#a7f3d0',
  '#fbcfe8',
];

const BACKGROUND = '#1f2937';
const PAGE_FILL = '#ffffff';
const PAGE_BORDER = '#0b0f19';
const ITEM_BORDER = '#374151';
const LABEL_COLOR = '#111827';
const PAGE_TAG_COLOR = '#e5e7eb';
const OVERFLOW_STRIPE = 'rgba(220, 38, 38, 0.75)';

const CONTAINER_BORDER = '#0b0f19';
const CONTAINER_FILL = 'rgba(99, 102, 241, 0.22)';

const SPACER_FILL = 'rgba(148, 163, 184, 0.18)';
const SPACER_HATCH = 'rgba(100, 116, 139, 0.45)';

const isContainer = (item) => item.kind === 'row' || item.kind === 'column';

const renderedExtent = (placed) => {
  if (isContainer(placed.item)) {
    return placed.children?.length
      ? Math.max(...placed.children.map((c) => c.y + renderedExtent(c)))
      : 0;
  }

  return placed.item.height;
};

// Colors are assigned in first-seen order per document, keyed by base id
// (the part before '/'), so the same item keeps its color across pages and
// split pieces stay the color of their source.
const makeColorPicker = () => {
  const assigned = new Map();

  return (id, fallback) => {
    const key = (id ?? `__${fallback}`).split('/')[0];

    if (!assigned.has(key)) {
      assigned.set(key, PALETTE[assigned.size % PALETTE.length]);
    }

    return assigned.get(key);
  };
};

const drawSpacerFill = (ctx, x, y, w, h) => {
  ctx.fillStyle = SPACER_FILL;
  ctx.fillRect(x, y, w, h);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.strokeStyle = SPACER_HATCH;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let d = -h; d < w; d += 8) {
    ctx.moveTo(x + d, y + h);
    ctx.lineTo(x + d + h, y);
  }
  ctx.stroke();
  ctx.restore();
};

const drawItemBorder = (ctx, x, y, w, h, part) => {
  ctx.strokeStyle = ITEM_BORDER;
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.setLineDash(part.isFirst ? [] : [4, 4]);
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash(part.isLast ? [] : [4, 4]);
  ctx.moveTo(x, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.moveTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.stroke();
};

const drawOverflowStripes = (ctx, x, y, w, h) => {
  const spacing = 6;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.strokeStyle = OVERFLOW_STRIPE;
  ctx.lineWidth = 2;
  for (let i = -h; i < w + h; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i + h, y + h);
    ctx.stroke();
  }
  ctx.restore();
};

const drawLabel = (ctx, labelX, labelY, text, scale) => {
  ctx.fillStyle = LABEL_COLOR;
  ctx.font = `bold ${5 * scale}px SnapshotFont`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, labelX, labelY);
};

const leafLabel = (placed, crumbs, overflows) => {
  const { item } = placed;
  const id = item.id ?? '?';
  const path = crumbs.length > 0 ? `${crumbs.join(' > ')} > ${id}` : id;
  return overflows ? `${path} h=${item.height} !` : path;
};

const drawPlacement = (
  ctx,
  placed,
  parentX,
  parentY,
  pageBottom,
  scale,
  regionWidth,
  counterRef,
  crumbs,
) => {
  const { item, y } = placed;
  const itemX = parentX;
  const itemY = parentY + y * scale;
  const itemW = regionWidth * scale;
  const itemH = renderedExtent(placed) * scale;
  const itemBottom = itemY + itemH;
  const overflows = itemBottom > pageBottom + 0.5;
  const isContainerItem = isContainer(item);

  if (isContainerItem) {
    // Container body fill
    ctx.fillStyle = CONTAINER_FILL;
    ctx.fillRect(itemX, itemY, itemW, itemH);

    // Continuation markers — dashed edges when a side is split
    if (!placed.part.isFirst || !placed.part.isLast) {
      ctx.strokeStyle = CONTAINER_BORDER;
      ctx.lineWidth = 1.5;

      if (!placed.part.isFirst) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(itemX, itemY);
        ctx.lineTo(itemX + itemW, itemY);
        ctx.stroke();
      }

      if (!placed.part.isLast) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(itemX, itemY + itemH);
        ctx.lineTo(itemX + itemW, itemY + itemH);
        ctx.stroke();
      }

      ctx.setLineDash([]);
    }
  } else if (item.kind === 'spacer') {
    counterRef.count += 1;
    drawSpacerFill(ctx, itemX, itemY, itemW, itemH);
    drawItemBorder(ctx, itemX, itemY, itemW, itemH, placed.part);
  } else {
    ctx.fillStyle = counterRef.colorFor(item.id, counterRef.count);
    counterRef.count += 1;
    ctx.fillRect(itemX, itemY, itemW, itemH);
    drawItemBorder(ctx, itemX, itemY, itemW, itemH, placed.part);
  }

  if (overflows) {
    const stripeH = 8 * scale;
    drawOverflowStripes(ctx, itemX, pageBottom - stripeH, itemW, stripeH);
  }

  if (!isContainerItem && itemH >= 7 * scale) {
    drawLabel(
      ctx,
      itemX + 1 * scale,
      itemY + 1 * scale,
      leafLabel(placed, crumbs, overflows),
      scale,
    );
  }

  if (placed.children) {
    const childParentY = itemY;
    const childCrumbs = isContainerItem ? [...crumbs, item.id ?? '?'] : crumbs;
    const isRow = item.kind === 'row';
    const childWidth = isRow
      ? regionWidth / placed.children.length
      : regionWidth;
    placed.children.forEach((child, idx) => {
      const childX = isRow ? itemX + idx * childWidth * scale : itemX;
      drawPlacement(
        ctx,
        child,
        childX,
        childParentY,
        pageBottom,
        scale,
        childWidth,
        counterRef,
        childCrumbs,
      );
    });
  }
};

// `region` is one {width, height} for every page, or an array with one
// region per page — stepwise pagination gives each page its own height.
const renderPagesToPNG = (pages, region, opts = {}) => {
  const scale = opts.scale ?? 3;
  const gap = opts.gap ?? 32;
  const margin = opts.margin ?? 24;
  const pageLabelHeight = 20;

  const regions = Array.isArray(region) ? region : pages.map(() => region);

  const stackHeight =
    regions.reduce((acc, r) => acc + r.height + pageLabelHeight, 0) +
    Math.max(0, pages.length - 1) * gap;

  const maxWidth = Math.max(...regions.map((r) => r.width));
  const canvasW = (maxWidth + margin * 2) * scale;
  const canvasH = (stackHeight + margin * 2) * scale;

  const canvas = createCanvas(canvasW, canvasH);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvasW, canvasH);

  let cursor = margin;
  let itemCounter = 0;
  const colorFor = makeColorPicker();

  pages.forEach((page, pageIndex) => {
    const pageRegion = regions[pageIndex];
    const pageX = margin * scale;
    const labelY = cursor * scale;
    const pageY = (cursor + pageLabelHeight) * scale;
    const regionW = pageRegion.width * scale;
    const regionH = pageRegion.height * scale;

    ctx.fillStyle = PAGE_TAG_COLOR;
    ctx.font = `${12 * scale}px SnapshotFont`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(
      `page ${pageIndex + 1}  ·  ${pageRegion.width} × ${pageRegion.height}`,
      pageX,
      labelY,
    );

    ctx.fillStyle = PAGE_FILL;
    ctx.fillRect(pageX, pageY, regionW, regionH);

    ctx.save();
    ctx.beginPath();
    ctx.rect(pageX, pageY, regionW, regionH);
    ctx.clip();

    const counterRef = { count: itemCounter, colorFor };
    page.forEach((placed) => {
      drawPlacement(
        ctx,
        placed,
        pageX,
        pageY,
        pageY + regionH,
        scale,
        pageRegion.width,
        counterRef,
        [],
      );
    });
    itemCounter = counterRef.count;

    ctx.restore();

    ctx.strokeStyle = PAGE_BORDER;
    ctx.lineWidth = 2;
    ctx.strokeRect(pageX, pageY, regionW, regionH);

    cursor += pageLabelHeight + pageRegion.height + gap;
  });

  return canvas.toBuffer('image/png');
};

export default renderPagesToPNG;
