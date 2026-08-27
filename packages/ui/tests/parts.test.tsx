import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// The renderer is built in now, so tests swap the module rather than a prop.
const doRender = vi.fn(async () => ({
  blob: new Blob(['pdf']),
  numPages: 3,
}));
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
  PlaygroundError: class extends Error {},
  errorLine: () => undefined,
}));

import { Playground } from '../src';
import type {
  CopyButtonComponentProps,
  DocumentComponentProps,
  DownloadButtonComponentProps,
  EditorComponentProps,
  FilesComponentProps,
  PaginationComponentProps,
  StatusComponentProps,
} from '../src';

const FILES = [
  { name: 'a.jsx', code: 'A' },
  { name: 'b.jsx', code: 'B' },
];

const writeText = vi.fn();

beforeEach(() => {
  let next = 0;
  vi.stubGlobal('URL', {
    createObjectURL: () => {
      next += 1;
      return `blob:${next}`;
    },
    revokeObjectURL: () => {},
  });
  doRender
    .mockClear()
    .mockResolvedValue({ blob: new Blob(['pdf']), numPages: 3 });
  writeText.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
});

afterEach(() => {
  // testing-library only registers its own cleanup when vitest globals are on
  cleanup();
  vi.unstubAllGlobals();
});

const Tabs = ({ files, activeFile, onSelect }: FilesComponentProps) => (
  <div>
    {files.map((file) => (
      <button
        key={file.name}
        type="button"
        data-active={file.name === activeFile}
        onClick={() => onSelect(file.name)}
      >
        {file.name}
      </button>
    ))}
  </div>
);

const Source = ({ value, fileName }: EditorComponentProps) => (
  <pre data-testid="source" data-file={fileName}>
    {value}
  </pre>
);

const Preview = ({ url, numPages }: DocumentComponentProps) => (
  <div>
    <span data-testid="url">{url ?? 'none'}</span>
    <span data-testid="pages">{numPages}</span>
  </div>
);

const Dot = ({ status }: StatusComponentProps) => (
  <span data-testid="status">{status}</span>
);

const Pager = ({ page, numPages, canNext }: PaginationComponentProps) => (
  <span data-testid="pager">{`${page}/${numPages}/${canNext}`}</span>
);

describe('Playground', () => {
  it('renders on mount and publishes a url', async () => {
    render(
      <Playground files={FILES}>
        <Playground.Document Component={Preview} />
        <Playground.Status Component={Dot} />
      </Playground>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('ready');
    });
    expect(screen.getByTestId('url').textContent).toBe('blob:1');
    expect(doRender).toHaveBeenCalledTimes(1);
  });

  it('binds the editor to the active file and follows a tab change', () => {
    render(
      <Playground files={FILES}>
        <Playground.Files Component={Tabs} />
        <Playground.Editor Component={Source} />
      </Playground>,
    );

    expect(screen.getByTestId('source').dataset.file).toBe('a.jsx');
    expect(screen.getByTestId('source').textContent).toBe('A');

    act(() => {
      screen.getByText('b.jsx').click();
    });

    expect(screen.getByTestId('source').dataset.file).toBe('b.jsx');
    expect(screen.getByTestId('source').textContent).toBe('B');
  });

  it('feeds the rendered page count through to Pagination', async () => {
    render(
      <Playground files={FILES}>
        <Playground.Pagination Component={Pager} />
      </Playground>,
    );

    expect(screen.getByTestId('pager').textContent).toBe('1/0/false');

    await waitFor(() => {
      expect(screen.getByTestId('pager').textContent).toBe('1/3/true');
    });
  });

  it('forwards className and style untouched', () => {
    render(
      <Playground files={FILES}>
        <Playground.Editor
          Component={({ className, style }) => (
            <span data-testid="styled" className={className} style={style} />
          )}
          className="mine"
          style={{ color: 'red' }}
        />
      </Playground>,
    );

    const node = screen.getByTestId('styled');
    expect(node.className).toBe('mine');
    expect(node.style.color).toBe('red');
  });

  it('renders nothing from Editor when there are no files', () => {
    render(
      <Playground files={[]}>
        <Playground.Editor Component={Source} />
      </Playground>,
    );

    expect(screen.queryByTestId('source')).toBeNull();
  });

  it('reports file changes to onFilesChange', () => {
    const onFilesChange = vi.fn();

    render(
      <Playground files={FILES} onFilesChange={onFilesChange}>
        <Playground.Editor
          Component={({ onChange }) => (
            <button type="button" onClick={() => onChange('EDITED')}>
              edit
            </button>
          )}
        />
      </Playground>,
    );

    act(() => {
      screen.getByText('edit').click();
    });

    expect(onFilesChange).toHaveBeenCalledWith([
      { name: 'a.jsx', code: 'EDITED' },
      { name: 'b.jsx', code: 'B' },
    ]);
  });

  it('reports the active file to onActiveFileChange', () => {
    const onActiveFileChange = vi.fn();

    render(
      <Playground files={FILES} onActiveFileChange={onActiveFileChange}>
        <Playground.Files Component={Tabs} />
      </Playground>,
    );

    act(() => {
      screen.getByText('b.jsx').click();
    });

    expect(onActiveFileChange).toHaveBeenCalledWith('b.jsx');
  });

  it('disables the download button until a document exists', async () => {
    const seen: DownloadButtonComponentProps[] = [];

    render(
      <Playground files={FILES} filename="report.pdf">
        <Playground.DownloadButton
          Component={(props) => {
            seen.push(props);
            return (
              <a href={props.href} data-testid="download">
                {String(props.disabled)}
              </a>
            );
          }}
        />
      </Playground>,
    );

    expect(seen[0].disabled).toBe(true);

    await waitFor(() => {
      expect(screen.getByTestId('download').textContent).toBe('false');
    });
    expect(seen[seen.length - 1].filename).toBe('report.pdf');
    expect(seen[seen.length - 1].href).toBe('blob:1');
  });

  it('keeps two instances isolated', async () => {
    render(
      <>
        <Playground files={[{ name: 'x.jsx', code: 'X' }]}>
          <Playground.Editor Component={Source} />
        </Playground>
        <Playground files={[{ name: 'y.jsx', code: 'Y' }]}>
          <Playground.Editor Component={Source} />
        </Playground>
      </>,
    );

    const sources = screen.getAllByTestId('source');
    expect(sources[0].textContent).toBe('X');
    expect(sources[1].textContent).toBe('Y');

    // each store runs its own first render rather than sharing one
    await waitFor(() => {
      expect(doRender).toHaveBeenCalledTimes(2);
    });
    expect(doRender.mock.calls[0][0]).toEqual([{ name: 'x.jsx', code: 'X' }]);
    expect(doRender.mock.calls[1][0]).toEqual([{ name: 'y.jsx', code: 'Y' }]);
  });
});

const CopyAction = ({ onPress, state }: CopyButtonComponentProps) => (
  <button type="button" data-testid="copy" onClick={onPress}>
    {state}
  </button>
);

describe('Playground.CopyButton', () => {
  it('copies the active file and reports copied', async () => {
    render(
      <Playground files={FILES}>
        <Playground.CopyButton Component={CopyAction} />
      </Playground>,
    );

    act(() => {
      screen.getByTestId('copy').click();
    });

    expect(writeText).toHaveBeenCalledWith('A');
    await waitFor(() => {
      expect(screen.getByTestId('copy').textContent).toBe('copied');
    });
  });

  it('reports failed when the clipboard rejects', async () => {
    writeText.mockRejectedValue(new Error('denied'));

    render(
      <Playground files={FILES}>
        <Playground.CopyButton Component={CopyAction} />
      </Playground>,
    );

    act(() => {
      screen.getByTestId('copy').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('copy').textContent).toBe('failed');
    });
  });

  it('returns to idle after the reset delay', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    try {
      render(
        <Playground files={FILES}>
          <Playground.CopyButton Component={CopyAction} />
        </Playground>,
      );

      await act(async () => {
        screen.getByTestId('copy').click();
      });
      expect(screen.getByTestId('copy').textContent).toBe('copied');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1500);
      });
      expect(screen.getByTestId('copy').textContent).toBe('idle');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps two copy buttons independent', async () => {
    render(
      <Playground files={FILES}>
        <Playground.CopyButton
          Component={(props) => (
            <button type="button" data-testid="copy-a" onClick={props.onPress}>
              {props.state}
            </button>
          )}
        />
        <Playground.CopyButton
          Component={(props) => (
            <button type="button" data-testid="copy-b" onClick={props.onPress}>
              {props.state}
            </button>
          )}
        />
      </Playground>,
    );

    await act(async () => {
      screen.getByTestId('copy-a').click();
    });

    expect(screen.getByTestId('copy-a').textContent).toBe('copied');
    expect(screen.getByTestId('copy-b').textContent).toBe('idle');
  });

  it('copies the file that is active now, not the one at mount', async () => {
    render(
      <Playground files={FILES}>
        <Playground.Files Component={Tabs} />
        <Playground.CopyButton Component={CopyAction} />
      </Playground>,
    );

    act(() => {
      screen.getByText('b.jsx').click();
    });
    act(() => {
      screen.getByTestId('copy').click();
    });

    expect(writeText).toHaveBeenCalledWith('B');
  });
});
