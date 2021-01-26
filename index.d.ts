/// <reference types="node" />

declare module '@react-pdf/renderer' {
  import * as React from 'react';

  namespace ReactPDF {
    export interface Style {
      //Flexbox

      alignContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'stretch'
        | 'space-between'
        | 'space-around';
      alignItems?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'stretch'
        | 'baseline';
      alignSelf?:
        | 'auto'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'baseline'
        | 'stretch';
      flex?: number;
      flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
      flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
      flexFlow?: number;
      flexGrow?: number;
      flexShrink?: number;
      flexBasis?: number;
      justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-around'
        | 'space-between'
        | 'space-evenly';
      order?: number;

      // Layout?:never,

      bottom?: number | string;
      display?: 'flex' | 'table' | 'none';
      left?: number | string;
      position?: 'absolute' | 'relative';
      right?: number | string;
      top?: number | string;

      // Dimension?:never,

      height?: number | string;
      maxHeight?: number | string;
      maxWidth?: number | string;
      minHeight?: number | string;
      minWidth?: number | string;
      width?: number | string;

      // Color?:never,

      backgroundColor?: string;
      color?: string;
      opacity?: number;

      // Text?:never,

      fontSize?: number | string;
      fontFamily?: string;
      fontStyle?: string | 'normal';
      fontWeight?:
        | number
        | 'thin'
        | 'hairline'
        | 'ultralight'
        | 'extralight'
        | 'light'
        | 'normal'
        | 'medium'
        | 'semibold'
        | 'demibold'
        | 'bold'
        | 'ultrabold'
        | 'extrabold'
        | 'heavy'
        | 'black';
      letterSpacing?: number | string;
      lineHeight?: number | string;
      maxLines?: number; //?
      textAlign?: 'left' | 'right' | 'center' | 'justify'; //?
      textDecoration?: 'line-through' | 'underline' | 'none';
      textDecorationColor?: string;
      textDecorationStyle?: 'dashed' | 'dotted' | 'solid' | string; //?
      textIndent?: any; //?
      textOverflow?: any; //?
      textTransform?: 'capitalize' | 'lowercase' | 'uppercase';

      // Sizing/positioning?:never,

      objectFit?: string;
      objectPosition?: number | string;
      objectPositionX?: number | string;
      objectPositionY?: number | string;

      // Margin/padding?:never,

      margin?: number | string;
      marginHorizontal?: number | string;
      marginVertical?: number | string;
      marginTop?: number | string;
      marginRight?: number | string;
      marginBottom?: number | string;
      marginLeft?: number | string;
      padding?: number | string;
      paddingHorizontal?: number | string;
      paddingVertical?: number | string;
      paddingTop?: number | string;
      paddingRight?: number | string;
      paddingBottom?: number | string;
      paddingLeft?: number | string;

      // Transformations?:never,

      transform?: string;
      transformOrigin?: number | string;
      transformOriginX?: number | string;
      transformOriginY?: number | string;

      // Borders?:never,

      border?: number | string;
      borderWidth?: number;
      borderColor?: string;
      borderStyle?: 'dashed' | 'dotted' | 'solid';
      borderTop?: number | string;
      borderTopColor?: string;
      borderTopStyle?: 'dashed' | 'dotted' | 'solid'; // ?
      borderTopWidth?: number | string;
      borderRight?: number | string;
      borderRightColor?: string;
      borderRightStyle?: 'dashed' | 'dotted' | 'solid'; //?
      borderRightWidth?: number | string;
      borderBottom?: number | string;
      borderBottomColor?: string;
      borderBottomStyle?: 'dashed' | 'dotted' | 'solid'; //?
      borderBottomWidth?: number | string;
      borderLeft?: number | string;
      borderLeftColor?: string;
      borderLeftStyle?: 'dashed' | 'dotted' | 'solid'; //?
      borderLeftWidth?: number | string;
      borderTopLeftRadius?: number | string;
      borderTopRightRadius?: number | string;
      borderBottomRightRadius?: number | string;
      borderBottomLeftRadius?: number | string;
      borderRadius?: number | string;
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
      /**
       * Hint that no page wrapping should occur between all sibling elements following the element within n points
       * @see https://react-pdf.org/advanced#orphan-&-widow-protection
       */
      minPresenceAhead?: number;
    }

    interface PageProps extends NodeProps {
      /**
       * Enable page wrapping for this page.
       * @see https://react-pdf.org/components#page-wrapping
       */
      wrap?: boolean;
      debug?: boolean;
      size?: string | [number, number] | { width: number; height: number };
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
      render?: (props: {
        pageNumber: number;
        subPageNumber: number;
      }) => React.ReactNode;
      children?: React.ReactNode;
    }

    /**
     * The most fundamental component for building a UI and is designed to be
     * nested inside other views and can have 0 to many children.
     */
    class View extends React.Component<ViewProps> {}

    type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    type BaseSourceObject =
      | string
      | Buffer
      | { data: Buffer; format: 'png' | 'jpg' }
      | { uri: string; method: HTTPMethod; body: any; headers: any }
      | undefined;

    type SourceObject =
      | BaseSourceObject
      | (() => BaseSourceObject | Promise<BaseSourceObject>);

    interface BaseImageProps extends NodeProps {
      debug?: boolean;
      cache?: boolean;
      safePath?: string;
      allowDangerousPaths?: boolean;
      id?: string;
    }

    interface ImageWithSrcProp extends BaseImageProps {
      src: SourceObject;
    }

    interface ImageWithSourceProp extends BaseImageProps {
      source: SourceObject;
    }

    type ImageProps = ImageWithSrcProp | ImageWithSourceProp;

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
      render?: (props: {
        pageNumber: number;
        totalPages: number;
        subPageNumber: number;
        subPageTotalPages: number;
      }) => React.ReactNode;
      children?: React.ReactNode;
      /**
       * How much hyphenated breaks should be avoided.
       */
      hyphenationCallback?: number;
      /**
       * Specifies the minimum number of lines in a text element that must be shown at the bottom of a page or its container.
       * @see https://react-pdf.org/advanced#orphan-&-widow-protection
       */
      orphans?: number;
      /**
       * Specifies the minimum number of lines in a text element that must be shown at the top of a page or its container..
       * @see https://react-pdf.org/advanced#orphan-&-widow-protection
       */
      widows?: number;
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
     * A React component for displaying a hyperlink. Link’s can be nested
     * inside a Text component, or being inside any other valid primitive.
     */
    class Link extends React.Component<LinkProps> {}

    interface NoteProps extends NodeProps {
      children: string;
    }

    class Note extends React.Component<NoteProps> {}

    interface CanvasProps extends NodeProps {
      debug?: boolean;
      paint: (
        painter: any,
        availableWidth: number,
        availableHeight: number,
      ) => null;
    }

    class Canvas extends React.Component<CanvasProps> {}

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
      width?: number | string;
      height?: number | string;
      style?: Style | Style[];
      className?: string;
      children?: React.ReactElement<DocumentProps>;
      innerRef?: React.Ref<HTMLIFrameElement>;
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

    type FontStyle = 'normal' | 'italic' | 'oblique';

    type FontWeight =
      | number
      | 'thin'
      | 'ultralight'
      | 'light'
      | 'normal'
      | 'medium'
      | 'semibold'
      | 'bold'
      | 'ultrabold'
      | 'heavy';

    interface FontSource {
      src: string;
      fontFamily: string;
      fontStyle: FontStyle;
      fontWeight: number;
      data: any;
      loading: boolean;
      options: any;
    }

    interface FontInstance {
      family: string;
      sources: FontSource[];
    }

    interface EmojiSource {
      url: string;
      format: string;
    }

    interface FontDescriptor {
      family: string;
      fontStyle?: FontStyle;
      fontWeight?: FontWeight;
    }

    interface RegisteredFont {
      src: string;
      loaded: boolean;
      loading: boolean;
      data: any;
      [key: string]: any;
    }

    type HyphenationCallback = (
      words: string,
      glyphString: { [key: string]: any },
    ) => string[];

    const Font: {
      register: (
        options:
          | {
              family: string;
              src: string;
              [key: string]: any;
            }
          | {
              family: string;
              fonts: {
                src: string;
                fontStyle?: string;
                fontWeight?: string | number;
                [key: string]: any;
              }[];
            },
      ) => void;
      getEmojiSource: () => EmojiSource;
      getRegisteredFonts: () => FontInstance[];
      getRegisteredFontFamilies: () => string[];
      registerEmojiSource: (emojiSource: EmojiSource) => void;
      registerHyphenationCallback: (
        hyphenationCallback: HyphenationCallback,
      ) => void;
      getHyphenationCallback: () => HyphenationCallback;
      getFont: (fontDescriptor: FontDescriptor) => RegisteredFont | undefined;
      load: (
        fontDescriptor: FontDescriptor,
        document: React.ReactElement<DocumentProps>,
      ) => Promise<void>;
      clear: () => void;
      reset: () => void;
    };

    const StyleSheet: {
      hairlineWidth: number;
      create: (styles: Styles) => Styles;
      resolve: (
        style: Style,
        container: {
          width: number;
          height: number;
          orientation: Orientation;
        },
      ) => Style;
      flatten: (...style: (Style[] | Style | undefined)[]) => Style;
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
        props: { [key: string]: any };
      },
      root?: any,
    ) => any;

    const pdf: (
      document: React.ReactElement<DocumentProps>,
    ) => {
      container: any;
      isDirty: () => boolean;
      updateContainer: (document: React.ReactElement<any>) => void;
      toBuffer: () => Promise<NodeJS.ReadableStream>;
      toBlob: () => Promise<Blob>;
      toString: () => string;
    };

    const renderToStream: (
      document: React.ReactElement<DocumentProps>,
    ) => Promise<NodeJS.ReadableStream>;

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
  const Canvas: typeof ReactPDF.Canvas;
  const Link: typeof ReactPDF.Link;
  const Note: typeof ReactPDF.Note;
  const Font: typeof ReactPDF.Font;
  const StyleSheet: typeof ReactPDF.StyleSheet;
  const createInstance: typeof ReactPDF.createInstance;
  const PDFRenderer: typeof ReactPDF.PDFRenderer;
  const version: typeof ReactPDF.version;
  const pdf: typeof ReactPDF.pdf;
  const PDFViewer: typeof ReactPDF.PDFViewer;
  const BlobProvider: typeof ReactPDF.BlobProvider;
  const PDFDownloadLink: typeof ReactPDF.PDFDownloadLink;

  export default ReactPDF;
  export {
    Document,
    Page,
    View,
    Image,
    Text,
    Canvas,
    Link,
    Note,
    Font,
    StyleSheet,
    createInstance,
    PDFRenderer,
    version,
    pdf,
    PDFViewer,
    BlobProvider,
    PDFDownloadLink,
  };
}
