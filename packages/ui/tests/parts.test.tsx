import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Repl } from '../src';
import type {
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

const renderOk = () => vi.fn(async () => new Blob(['pdf']));

beforeEach(() => {
  let next = 0;
  vi.stubGlobal('URL', {
    createObjectURL: () => {
      next += 1;
      return `blob:${next}`;
    },
    revokeObjectURL: () => {},
  });
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

const Preview = ({ url, numPages, onLoad }: DocumentComponentProps) => (
  <div>
    <span data-testid="url">{url ?? 'none'}</span>
    <span data-testid="pages">{numPages}</span>
    <button type="button" onClick={() => onLoad({ numPages: 3 })}>
      load
    </button>
  </div>
);

const Dot = ({ status }: StatusComponentProps) => (
  <span data-testid="status">{status}</span>
);

const Pager = ({ page, numPages, canNext }: PaginationComponentProps) => (
  <span data-testid="pager">{`${page}/${numPages}/${canNext}`}</span>
);

describe('Repl', () => {
  it('renders on mount and publishes a url', async () => {
    const doRender = renderOk();

    render(
      <Repl render={doRender} defaultFiles={FILES}>
        <Repl.Document Component={Preview} />
        <Repl.Status Component={Dot} />
      </Repl>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('ready');
    });
    expect(screen.getByTestId('url').textContent).toBe('blob:1');
    expect(doRender).toHaveBeenCalledTimes(1);
  });

  it('binds the editor to the active file and follows a tab change', () => {
    render(
      <Repl render={renderOk()} defaultFiles={FILES}>
        <Repl.Files Component={Tabs} />
        <Repl.Editor Component={Source} />
      </Repl>,
    );

    expect(screen.getByTestId('source').dataset.file).toBe('a.jsx');
    expect(screen.getByTestId('source').textContent).toBe('A');

    act(() => {
      screen.getByText('b.jsx').click();
    });

    expect(screen.getByTestId('source').dataset.file).toBe('b.jsx');
    expect(screen.getByTestId('source').textContent).toBe('B');
  });

  it('honours defaultActiveFile', () => {
    render(
      <Repl render={renderOk()} defaultFiles={FILES} defaultActiveFile="b.jsx">
        <Repl.Editor Component={Source} />
      </Repl>,
    );

    expect(screen.getByTestId('source').dataset.file).toBe('b.jsx');
  });

  it('feeds the page count reported by Document through to Pagination', () => {
    render(
      <Repl render={renderOk()} defaultFiles={FILES}>
        <Repl.Document Component={Preview} />
        <Repl.Pagination Component={Pager} />
      </Repl>,
    );

    expect(screen.getByTestId('pager').textContent).toBe('1/0/false');

    act(() => {
      screen.getByText('load').click();
    });

    expect(screen.getByTestId('pager').textContent).toBe('1/3/true');
  });

  it('forwards className and style untouched', () => {
    render(
      <Repl render={renderOk()} defaultFiles={FILES}>
        <Repl.Editor
          Component={({ className, style }) => (
            <span data-testid="styled" className={className} style={style} />
          )}
          className="mine"
          style={{ color: 'red' }}
        />
      </Repl>,
    );

    const node = screen.getByTestId('styled');
    expect(node.className).toBe('mine');
    expect(node.style.color).toBe('red');
  });

  it('renders nothing from Editor when there are no files', () => {
    render(
      <Repl render={renderOk()} defaultFiles={[]}>
        <Repl.Editor Component={Source} />
      </Repl>,
    );

    expect(screen.queryByTestId('source')).toBeNull();
  });

  it('reports file changes to onFilesChange', () => {
    const onFilesChange = vi.fn();

    render(
      <Repl
        render={renderOk()}
        defaultFiles={FILES}
        onFilesChange={onFilesChange}
      >
        <Repl.Files
          Component={({ onAdd }) => (
            <button
              type="button"
              onClick={() => onAdd({ name: 'c.jsx', code: 'C' })}
            >
              add
            </button>
          )}
        />
      </Repl>,
    );

    act(() => {
      screen.getByText('add').click();
    });

    expect(onFilesChange).toHaveBeenCalledWith([
      ...FILES,
      { name: 'c.jsx', code: 'C' },
    ]);
  });

  it('reports the active file to onActiveFileChange', () => {
    const onActiveFileChange = vi.fn();

    render(
      <Repl
        render={renderOk()}
        defaultFiles={FILES}
        onActiveFileChange={onActiveFileChange}
      >
        <Repl.Files Component={Tabs} />
      </Repl>,
    );

    act(() => {
      screen.getByText('b.jsx').click();
    });

    expect(onActiveFileChange).toHaveBeenCalledWith('b.jsx');
  });

  it('disables the download button until a document exists', async () => {
    const seen: DownloadButtonComponentProps[] = [];

    render(
      <Repl render={renderOk()} defaultFiles={FILES} filename="report.pdf">
        <Repl.DownloadButton
          Component={(props) => {
            seen.push(props);
            return (
              <a href={props.href} data-testid="download">
                {String(props.disabled)}
              </a>
            );
          }}
        />
      </Repl>,
    );

    expect(seen[0].disabled).toBe(true);

    await waitFor(() => {
      expect(screen.getByTestId('download').textContent).toBe('false');
    });
    expect(seen[seen.length - 1].filename).toBe('report.pdf');
    expect(seen[seen.length - 1].href).toBe('blob:1');
  });

  it('keeps two instances isolated', async () => {
    const one = vi.fn(async () => new Blob(['one']));
    const two = vi.fn(async () => new Blob(['two']));

    render(
      <>
        <Repl render={one} defaultFiles={[{ name: 'x.jsx', code: 'X' }]}>
          <Repl.Editor Component={Source} />
        </Repl>
        <Repl render={two} defaultFiles={[{ name: 'y.jsx', code: 'Y' }]}>
          <Repl.Editor Component={Source} />
        </Repl>
      </>,
    );

    const sources = screen.getAllByTestId('source');
    expect(sources[0].textContent).toBe('X');
    expect(sources[1].textContent).toBe('Y');

    await waitFor(() => {
      expect(one).toHaveBeenCalledTimes(1);
      expect(two).toHaveBeenCalledTimes(1);
    });
  });

  it('does not re-render when the consumer passes an inline render function', async () => {
    let calls = 0;

    const Harness = ({ tick }: { tick: number }) => (
      <Repl
        render={async () => {
          calls += 1;
          return new Blob(['pdf']);
        }}
        defaultFiles={FILES}
      >
        <Repl.Status Component={Dot} />
        <span data-testid="tick">{tick}</span>
      </Repl>
    );

    const { rerender } = render(<Harness tick={1} />);
    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('ready');
    });
    expect(calls).toBe(1);

    rerender(<Harness tick={2} />);
    rerender(<Harness tick={3} />);
    await waitFor(() => {
      expect(screen.getByTestId('tick').textContent).toBe('3');
    });

    expect(calls).toBe(1);
  });
});
