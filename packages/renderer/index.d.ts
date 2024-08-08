import * as React from 'react';
import {
  Style,
  PageSize,
  FontStore,
  PDFVersion,
  Orientation,
  SourceObject,
  HyphenationCallback,
  SVGPresentationAttributes,
  Bookmark,
  PageLayout,
  PageMode,
} from '@react-pdf/types';

declare class ReactPDF {
  static default: typeof ReactPDF;
}

export = ReactPDF;

declare namespace ReactPDF {
  interface Styles {
    [key: string]: Style;
  }
  interface OnRenderProps {
    blob?: Blob;
  }

  interface DocumentProps {
    style?: Style | Style[];
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    keywords?: string;
    producer?: string;
    language?: string;
    creationDate?: Date;
    modificationDate?: Date;
    pdfVersion?: PDFVersion;
    pageMode?: PageMode;
    pageLayout?: PageLayout;
    onRender?: (props: OnRenderProps) => any;
  }

  /**
   * This component represent the PDF document itself. It must be the root
   * of your tree element structure, and under no circumstances should it be
   * used as children of another react-pdf component. In addition, it should
   * only have childs of type <Page />.
   */
  class Document extends React.Component<
    React.PropsWithChildren<DocumentProps>
  > {}

  interface NodeProps {
    id?: string;
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
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    size?: PageSize;
    orientation?: Orientation;
    dpi?: number;
    bookmark?: Bookmark;
  }

  /**
   * Represents single page inside the PDF document, or a subset of them if
   * using the wrapping feature. A <Document /> can contain as many pages as
   * you want, but ensure not rendering a page inside any component besides
   * Document.
   */
  class Page extends React.Component<React.PropsWithChildren<PageProps>> {}

  interface ViewProps extends NodeProps {
    id?: string;
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    render?: (props: {
      pageNumber: number;
      subPageNumber: number;
    }) => React.ReactNode;
  }

  /**
   * The most fundamental component for building a UI and is designed to be
   * nested inside other views and can have 0 to many children.
   */
  class View extends React.Component<React.PropsWithChildren<ViewProps>> {}

  interface BaseImageProps extends NodeProps {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    cache?: boolean;
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
    id?: string;
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    render?: (props: {
      pageNumber: number;
      totalPages: number;
      subPageNumber: number;
      subPageTotalPages: number;
    }) => React.ReactNode;
    /**
     * Override the default hyphenation-callback
     * @see https://react-pdf.org/fonts#registerhyphenationcallback
     */
    hyphenationCallback?: HyphenationCallback;
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

  interface SVGTextProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x: string | number;
    y: string | number;
    /**
     * Override the default hyphenation-callback
     * @see https://react-pdf.org/fonts#registerhyphenationcallback
     */
    hyphenationCallback?: HyphenationCallback;
  }

  /**
   * A React component for displaying text. Text supports nesting of other
   * Text or Link components to create inline styling.
   */
  class Text extends React.Component<
    React.PropsWithChildren<TextProps> | SVGTextProps
  > {}

  interface LinkProps extends NodeProps {
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    href?: string;
    src?: string;
  }

  /**
   * A React component for displaying a hyperlink. Link’s can be nested
   * inside a Text component, or being inside any other valid primitive.
   */
  class Link extends React.Component<React.PropsWithChildren<LinkProps>> {}

  interface NoteProps extends NodeProps {
    children: string;
  }

  class Note extends React.Component<NoteProps> {}

  interface CanvasProps extends NodeProps {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    paint: (
      painter: any,
      availableWidth: number,
      availableHeight: number,
    ) => null;
  }

  class Canvas extends React.Component<CanvasProps> {}

  interface SVGProps extends NodeProps, SVGPresentationAttributes {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    preserveAspectRatio?: string;
  }

  /**
   * The <SVG /> element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents.
   */
  class Svg extends React.Component<React.PropsWithChildren<SVGProps>> {}

  interface LineProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x1: string | number;
    x2: string | number;
    y1: string | number;
    y2: string | number;
  }

  /**
   * The <Line /> element is used to create a line.
   */
  class Line extends React.Component<React.PropsWithChildren<LineProps>> {}

  interface PolylineProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    points: string;
  }

  /**
   * The <Polyline /> element is used to create any shape that consists of only straight lines (that is connected at several points).
   */
  class Polyline extends React.Component<
    React.PropsWithChildren<PolylineProps>
  > {}

  interface PolygonProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    points: string;
  }

  /**
   * The <Polygon /> element is used to create a graphic that contains at least three sides.
   * Polygons are made of straight lines, and the shape is "closed" (all the lines connect up).
   */
  class Polygon extends React.Component<
    React.PropsWithChildren<PolygonProps>
  > {}

  interface PathProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    d: string;
  }

  /**
   * The <Path /> element is the most powerful element in the SVG library of basic shapes. It can be used to create lines, curves, arcs, and more.
   */
  class Path extends React.Component<React.PropsWithChildren<PathProps>> {}

  interface RectProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x?: string | number;
    y?: string | number;
    width: string | number;
    height: string | number;
    rx?: string | number;
    ry?: string | number;
  }

  /**
   * The <Rect /> element is used to create a rectangle and variations of a rectangle shape.
   */
  class Rect extends React.Component<React.PropsWithChildren<RectProps>> {}

  interface CircleProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    cx?: string | number;
    cy?: string | number;
    r: string | number;
  }

  /**
   * The <Circle /> element is used to create a circle.
   */
  class Circle extends React.Component<React.PropsWithChildren<CircleProps>> {}

  interface EllipseProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    cx?: string | number;
    cy?: string | number;
    rx: string | number;
    ry: string | number;
  }

  /**
   * The <Ellipse /> element is used to create an ellipse.
   * An ellipse is closely related to a circle. The difference is that an ellipse has an x and a y radius that differs from each other, while a circle has equal x and y radius.
   */
  class Ellipse extends React.Component<
    React.PropsWithChildren<EllipseProps>
  > {}

  interface TspanProps extends SVGPresentationAttributes {
    x?: string | number;
    y?: string | number;
  }

  /**
   * The <Tspan /> element defines a subtext within a <Text /> element or another <Tspan /> element.
   * It allows for adjustment of the style and/or position of that subtext as needed.
   */
  class Tspan extends React.Component<React.PropsWithChildren<TspanProps>> {}

  interface GProps extends SVGPresentationAttributes {
    style?: Style;
  }

  /**
   * The <G /> SVG element is a container used to group other SVG elements.
   * Transformations applied to the <G /> element are performed on its child elements, and its attributes are inherited by its children.
   */
  class G extends React.Component<React.PropsWithChildren<GProps>> {}

  interface StopProps {
    offset: string | number;
    stopColor: string;
    stopOpacity?: string | number;
  }

  /**
   * The SVG <Stop /> element defines a color and its position to use on a gradient. This element is always a child of a <LinearGradient /> or <RadialGradient /> element
   */
  class Stop extends React.Component<React.PropsWithChildren<StopProps>> {}

  interface DefsProps {}

  /**
   * The <Defs /> element is used to store graphical objects that will be used at a later time. Objects created inside a <Defs /> element are not rendered directly. To display them you have to reference them
   */
  class Defs extends React.Component<React.PropsWithChildren<DefsProps>> {}

  interface ClipPathProps {
    id?: string;
  }

  /**
   * The <ClipPath /> SVG element defines a clipping path, to be used by the clipPath property.
   * A clipping path restricts the region to which paint can be applied. Conceptually, parts of the drawing that lie outside of the region bounded by the clipping path are not drawn.
   */
  class ClipPath extends React.Component<
    React.PropsWithChildren<ClipPathProps>
  > {}

  interface LinearGradientProps {
    id: string;
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
  }

  /**
   * The <LinearGradient /> element lets authors define linear gradients that can be applied to fill or stroke of graphical elements.
   */
  class LinearGradient extends React.Component<
    React.PropsWithChildren<LinearGradientProps>
  > {}

  interface RadialGradientProps {
    id: string;
    cx?: string | number;
    cy?: string | number;
    fr?: string | number;
    fx?: string | number;
    fy?: string | number;
  }

  /**
   * The <RadialGradient /> element lets authors define radial gradients that can be applied to fill or stroke of graphical elements.
   */
  class RadialGradient extends React.Component<
    React.PropsWithChildren<RadialGradientProps>
  > {}

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
    showToolbar?: boolean;
  }

  /**
   * Iframe PDF viewer for client-side generated documents.
   * @platform web
   */
  class PDFViewer extends React.Component<PDFViewerProps> {}

  interface PDFDownloadLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** PDF filename. Alias for anchor tag `download` attribute. */
    fileName?: string;
    document: React.ReactElement<DocumentProps>;
    children?:
      | React.ReactNode
      | ((params: BlobProviderParams) => React.ReactNode);
    onClick?(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      instance: UsePDFInstance,
    ): void;
  }

  /**
   * Anchor tag to enable generate and download PDF documents on the fly.
   * @see https://react-pdf.org/advanced#on-the-fly-rendering
   * @platform web
   */
  class PDFDownloadLink extends React.Component<PDFDownloadLinkProps> {}

  interface UsePDFInstance {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  }

  /**
   * React hook for creating and updating a PDF document instance
   * @platform web
   */
  function usePDF(options?: {
    document?: React.ReactElement<DocumentProps>;
  }): [
    UsePDFInstance,
    (newDocument: React.ReactElement<DocumentProps>) => void,
  ];

  const Font: FontStore;

  const StyleSheet: {
    create: <T extends Styles>(styles: T) => T;
  };

  const version: any;

  const PDFRenderer: any;

  const pdf: (initialValue?: React.ReactElement<DocumentProps>) => {
    container: any;
    isDirty: () => boolean;
    toString: () => string;
    toBlob: () => Promise<Blob>;
    toBuffer: () => Promise<NodeJS.ReadableStream>;
    on: (event: 'change', callback: () => void) => void;
    updateContainer: (
      document: React.ReactElement<any>,
      callback?: () => void,
    ) => void;
    removeListener: (event: 'change', callback: () => void) => void;
  };

  const renderToStream: (
    document: React.ReactElement<DocumentProps>,
  ) => Promise<NodeJS.ReadableStream>;

  /**
   * @deprecated use the `renderToBuffer` method
   */
  const renderToString: (
    document: React.ReactElement<DocumentProps>,
  ) => Promise<string>;

  const renderToFile: (
    document: React.ReactElement<DocumentProps>,
    filePath: string,
    callback?: (output: NodeJS.ReadableStream, filePath: string) => any,
  ) => Promise<NodeJS.ReadableStream>;

  const render: typeof renderToFile;
}

declare const pdf: typeof ReactPDF.pdf;
declare const Document: typeof ReactPDF.Document;
declare const Page: typeof ReactPDF.Page;
declare const View: typeof ReactPDF.View;
declare const Image: typeof ReactPDF.Image;
declare const Text: typeof ReactPDF.Text;
declare const Canvas: typeof ReactPDF.Canvas;
declare const Link: typeof ReactPDF.Link;
declare const Note: typeof ReactPDF.Note;
declare const Svg: typeof ReactPDF.Svg;
declare const Line: typeof ReactPDF.Line;
declare const Polyline: typeof ReactPDF.Polyline;
declare const Polygon: typeof ReactPDF.Polygon;
declare const Path: typeof ReactPDF.Path;
declare const Rect: typeof ReactPDF.Rect;
declare const Circle: typeof ReactPDF.Circle;
declare const Ellipse: typeof ReactPDF.Ellipse;
declare const Tspan: typeof ReactPDF.Tspan;
declare const G: typeof ReactPDF.G;
declare const Stop: typeof ReactPDF.Stop;
declare const Defs: typeof ReactPDF.Defs;
declare const ClipPath: typeof ReactPDF.ClipPath;
declare const LinearGradient: typeof ReactPDF.LinearGradient;
declare const RadialGradient: typeof ReactPDF.RadialGradient;
declare const Font: typeof ReactPDF.Font;
declare const StyleSheet: typeof ReactPDF.StyleSheet;
declare const PDFRenderer: typeof ReactPDF.PDFRenderer;
declare const version: typeof ReactPDF.version;
declare const renderToFile: typeof ReactPDF.renderToFile;
declare const renderToStream: typeof ReactPDF.renderToStream;
declare const usePDF: typeof ReactPDF.usePDF;
declare const PDFViewer: typeof ReactPDF.PDFViewer;
declare const BlobProvider: typeof ReactPDF.BlobProvider;
declare const PDFDownloadLink: typeof ReactPDF.PDFDownloadLink;

export default ReactPDF;

/**
 * Render document into a nodejs buffer
 * @platform node
 */
export const renderToBuffer: (
  document: React.ReactElement<ReactPDF.DocumentProps>,
) => Promise<Buffer>;

/**
 * Render document into a string
 * @platform node
 * @deprecated use the `renderToBuffer` method
 */
export const renderToString: typeof ReactPDF.renderToString;

export {
  pdf,
  Document,
  Page,
  View,
  Image,
  Text,
  Canvas,
  Link,
  Note,
  Svg,
  Line,
  Polyline,
  Polygon,
  Path,
  Rect,
  Circle,
  Ellipse,
  Tspan,
  G,
  Stop,
  Defs,
  ClipPath,
  LinearGradient,
  RadialGradient,
  Font,
  StyleSheet,
  PDFRenderer,
  version,
  renderToFile,
  renderToStream,
  usePDF,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
};
