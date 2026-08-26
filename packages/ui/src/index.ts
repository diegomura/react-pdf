import CopyButton from './parts/copy-button';
import Document from './parts/document';
import DownloadButton from './parts/download-button';
import Editor from './parts/editor';
import Files from './parts/files';
import Pagination from './parts/pagination';
import Root from './parts/root';
import Status from './parts/status';

Object.assign(Root, {
  CopyButton,
  Document,
  DownloadButton,
  Editor,
  Files,
  Pagination,
  Status,
});

const Repl = Root as typeof Root & {
  CopyButton: typeof CopyButton;
  Document: typeof Document;
  DownloadButton: typeof DownloadButton;
  Editor: typeof Editor;
  Files: typeof Files;
  Pagination: typeof Pagination;
  Status: typeof Status;
};

export default Repl;
export { Repl };

export { default as filesAtom } from './atoms/files';
export { default as activeFileAtom } from './atoms/active-file';
export { default as statusAtom } from './atoms/status';
export { default as blobAtom } from './atoms/blob';

export type { RootProps } from './parts/root/root';
export type {
  CopyButtonComponentProps,
  CopyButtonProps,
} from './parts/copy-button/copy-button';
export type { DocumentComponentProps } from './parts/document/document';
export type { DownloadButtonComponentProps } from './parts/download-button/download-button';
export type { EditorComponentProps } from './parts/editor/editor';
export type { FilesComponentProps } from './parts/files/files';
export type { PaginationComponentProps } from './parts/pagination/pagination';
export type { StatusComponentProps } from './parts/status/status';

export * from './types';
