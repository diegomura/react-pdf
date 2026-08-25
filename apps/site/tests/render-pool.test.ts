import { afterEach, beforeEach, expect, test, vi } from 'vitest';

type Posted = { id: number; code: string };

class FakeWorker {
  static instances: FakeWorker[] = [];

  onmessage: ((event: { data: unknown }) => void) | null = null;

  onerror: (() => void) | null = null;

  posted: Posted[] = [];

  constructor() {
    FakeWorker.instances.push(this);
  }

  postMessage(message: Posted) {
    this.posted.push(message);
  }

  terminate() {}

  reply(id: number, payload: Record<string, unknown>) {
    this.onmessage?.({ data: { id, ...payload } });
  }
}

const load = () => import('../src/repl/render-pool');

// the queue defers each send by a microtask, so the worker only exists a tick in
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  vi.resetModules();
  FakeWorker.instances = [];
  vi.stubGlobal('Worker', FakeWorker);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('every example on a page shares one worker', async () => {
  const { renderExample } = await load();

  const first = renderExample('a');
  const second = renderExample('b');
  await tick();

  const worker = FakeWorker.instances[0];
  worker.reply(worker.posted[0].id, { blob: 'A' });
  await first;
  await tick();
  worker.reply(worker.posted[1].id, { blob: 'B' });
  await second;

  expect(FakeWorker.instances).toHaveLength(1);
});

test('renders are serialised so overlapping examples cannot share worker state', async () => {
  const { renderExample } = await load();

  const first = renderExample('a');
  renderExample('b');
  await tick();

  const worker = FakeWorker.instances[0];
  expect(worker.posted.map((p) => p.code)).toEqual(['a']);

  worker.reply(worker.posted[0].id, { blob: 'A' });
  await first;
  await tick();

  expect(worker.posted.map((p) => p.code)).toEqual(['a', 'b']);
});

test('a failed render resolves with the error instead of hanging', async () => {
  const { renderExample } = await load();

  const pending = renderExample('boom');
  await tick();
  const worker = FakeWorker.instances[0];
  worker.reply(worker.posted[0].id, { error: 'nope' });

  expect(await pending).toMatchObject({ error: 'nope' });
});

test('a crashed worker settles the queue and is replaced on the next render', async () => {
  const { renderExample } = await load();

  const pending = renderExample('a');
  await tick();
  const crashed = FakeWorker.instances[0];
  crashed.onerror?.();

  expect(await pending).toHaveProperty('error');

  const next = renderExample('b');
  await tick();
  expect(FakeWorker.instances).toHaveLength(2);

  const replacement = FakeWorker.instances[1];
  replacement.reply(replacement.posted[0].id, { blob: 'B' });
  expect(await next).toMatchObject({ blob: 'B' });
});
