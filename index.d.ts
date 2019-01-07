/// <reference types="node" />

declare module '@react-pdf/renderer' {
  import * as React from 'react';

  namespace ReactPDF {
    interface Style {
      [property: string]: any;
    }
    interface Styles {
      [key: string]: Style;
    }
    type Orientation = 'portrait' | 'landscape';

    interface DocumentProps {
      title?: string;
      author?: string;
      subject?: string;
      keywords?: string;
      creator?: string;
      producer?: string;
      onRender?: () => any;
    }

    /**
     * This component represent the PDF document itself. It must be the root
     * of your tree element structure, and under no circumstances should it be
     * used as children of another react-pdf component. In addition, it should
     * only have childs of type <Page />.
     */
    class Document extends React.Component<DocumentProps> {}

    interface NodeProps {
      style?: Style | Style[];
      /**
       * Render component in all wrapped pages.
       * @see https://react-pdf.org/advanced#fixed-components
       */
      fixed?: boolean;
      /**
       * Force the wrapping algorithm to start a new page when rendering the
       * element.
       * @see https://react-pdf.org/advanced#page-breaks
       */
      break?: boolean;
    }

    interface PageProps extends NodeProps {
      /**
       * Enable page wrapping for this page.
       * @see https://react-pdf.org/components#page-wrapping
       */
      wrap?: boolean;
      debug?: boolean;
      size?: string | [number, number] | {width: number; height: number};
      orientation?: Orientation;
      ruler?: boolean;
      rulerSteps?: number;
      verticalRuler?: boolean;
      verticalRulerSteps?: number;
      horizontalRuler?: boolean;
      horizontalRulerSteps?: number;
    }

    /**
     * Represents single page inside the PDF document, or a subset of them if
     * using the wrapping feature. A <Document /> can contain as many pages as
     * you want, but ensure not rendering a page inside any component besides
     * Document.
     */
    class Page extends React.Component<PageProps> {}

    interface ViewProps extends NodeProps {
      /**
       * Enable/disable page wrapping for element.
       * @see https://react-pdf.org/components#page-wrapping
       */
      wrap?: boolean;
      debug?: boolean;
      render?: (props: {pageNumber: number}) => React.ReactNode;
      children?: React.ReactNode;
    }

    /**
     * The most fundamental component for building a UI and is designed to be
     * nested inside other views and can have 0 to many children.
     */
    class View extends React.Component<ViewProps> {}

    interface ImageProps extends NodeProps {
      debug?: boolean;
      src: string | {data: Buffer; format: 'png' | 'jpg'};
      cache?: boolean;
    }

    /**
     * A React component for displaying network or local (Node only) JPG or
     * PNG images, as well as base64 encoded image strings.
     */
    class Image extends React.Component<ImageProps> {}

    interface TextProps extends NodeProps {
      /**
       * Enable/disable page wrapping for element.
       * @see https://react-pdf.org/components#page-wrapping
       */
      wrap?: boolean;
      debug?: boolean;
      render?: (
        props: {pageNumber: number; totalPages: number},
      ) => React.ReactNode;
      children?: React.ReactNode;
      /**
       * How much hyphenated breaks should be avoided.
       */
      hyphenationCallback?: number;
    }

    /**
     * A React component for displaying text. Text supports nesting of other
     * Text or Link components to create inline styling.
     */
    class Text extends React.Component<TextProps> {}

    interface LinkProps extends NodeProps {
      /**
       * Enable/disable page wrapping for element.
       * @see https://react-pdf.org/components#page-wrapping
       */
      wrap?: boolean;
      debug?: boolean;
      src: string;
      children?: React.ReactNode;
    }

    /**
     * A React component for displaying an hyperlink. Link’s can be nested
     * inside a Text component, or being inside any other valid primitive.
     */
    class Link extends React.Component<LinkProps> {}

    interface NoteProps extends NodeProps {
      children: string;
    }

    class Note extends React.Component<NoteProps> {}

    interface BlobProviderParams {
      blob: Blob | null;
      url: string | null;
      loading: boolean;
      error: Error | null;
    }
    interface BlobProviderProps {
      document: React.ReactElement<DocumentProps>;
      children: (params: BlobProviderParams) => React.ReactNode;
    }

    /**
     * Easy and declarative way of getting document's blob data without
     * showing it on screen.
     * @see https://react-pdf.org/advanced#on-the-fly-rendering
     * @platform web
     */
    class BlobProvider extends React.Component<BlobProviderProps> {}

    interface PDFViewerProps {
      width?: number;
      height?: number;
      style?: Style | Style[];
      className?: string;
      children?: React.ReactElement<DocumentProps>;
    }

    /**
     * Iframe PDF viewer for client-side generated documents.
     * @platform web
     */
    class PDFViewer extends React.Component<PDFViewerProps> {}

    interface PDFDownloadLinkProps {
      document: React.ReactElement<DocumentProps>;
      fileName?: string;
      style?: Style | Style[];
      className?: string;
      children?:
        | React.ReactNode
        | ((params: BlobProviderParams) => React.ReactNode);
    }

    /**
     * Anchor tag to enable generate and download PDF documents on the fly.
     * @see https://react-pdf.org/advanced#on-the-fly-rendering
     * @platform web
     */
    class PDFDownloadLink extends React.Component<PDFDownloadLinkProps> {}

    interface EmojiSource {
      url: string;
      format: string;
    }
    interface RegisteredFont {
      src: string;
      loaded: boolean;
      loading: boolean;
      data: any;
      [key: string]: any;
    }
    type HyphenationCallback = (
      words: string[],
      glyphString: {[key: string]: any},
    ) => string[];

    const Font: {
      register: (
        src: string,
        options: {family: string; [key: string]: any},
      ) => void;
      getEmojiSource: () => EmojiSource;
      getRegisteredFonts: () => string[];
      registerEmojiSource: (emojiSource: EmojiSource) => void;
      registerHyphenationCallback: (
        hyphenationCallback: HyphenationCallback,
      ) => void;
      getHyphenationCallback: () => HyphenationCallback;
      getFont: (fontFamily: string) => RegisteredFont | undefined;
      load: (
        fontFamily: string,
        document: React.ReactElement<DocumentProps>,
      ) => Promise<void>;
      clear: () => void;
      reset: () => void;
    };

    const StyleSheet: {
      hairlineWidth: number;
      create: <TStyles>(styles: TStyles) => TStyles;
      resolve: (
        style: Style,
        container: {
          width: number;
          height: number;
          orientation: Orientation;
        },
      ) => Style;
      flatten: (...styles: Style[]) => Style;
      absoluteFillObject: {
        position: 'absolute';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      };
    };

    const version: any;

    const PDFRenderer: any;

    const createInstance: (
      element: {
        type: string;
        props: {[key: string]: any};
      },
      root?: any,
    ) => any;

    const pdf: (
      document: React.ReactElement<DocumentProps>,
    ) => {
      isDirty: () => boolean;
      updateContainer: (document: React.ReactElement<any>) => void;
      toBuffer: () => NodeJS.ReadableStream;
      toBlob: () => Blob;
      toString: () => string;
    };

    const renderToStream: (
      document: React.ReactElement<DocumentProps>,
    ) => NodeJS.ReadableStream;

    const renderToFile: (
      document: React.ReactElement<DocumentProps>,
      filePath: string,
      callback?: (output: NodeJS.ReadableStream, filePath: string) => any,
    ) => Promise<NodeJS.ReadableStream>;

    const render: typeof renderToFile;
  }

  const Document: typeof ReactPDF.Document;
  const Page: typeof ReactPDF.Page;
  const View: typeof ReactPDF.View;
  const Image: typeof ReactPDF.Image;
  const Text: typeof ReactPDF.Text;
  const Link: typeof ReactPDF.Link;
  const Note: typeof ReactPDF.Note;
  const Font: typeof ReactPDF.Font;
  const StyleSheet: typeof ReactPDF.StyleSheet;
  const createInstance: typeof ReactPDF.createInstance;
  const PDFRenderer: typeof ReactPDF.PDFRenderer;
  const version: typeof ReactPDF.version;
  const pdf: typeof ReactPDF.pdf;

  export default ReactPDF;
  export {
    Document,
    Page,
    View,
    Image,
    Text,
    Link,
    Note,
    Font,
    StyleSheet,
    createInstance,
    PDFRenderer,
    version,
    pdf,
  };
}
