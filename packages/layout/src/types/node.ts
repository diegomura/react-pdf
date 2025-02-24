import { CanvasNode, SafeCanvasNode } from './canvas';
import { CheckboxNode, SafeCheckboxNode } from './checkbox';
import { CircleNode, SafeCircleNode } from './circle';
import { ClipPathNode, SafeClipPathNode } from './clip-path';
import { DefsNode, SafeDefsNode } from './defs';
import { DocumentNode, SafeDocumentNode } from './document';
import { EllipseNode, SafeEllipseNode } from './ellipse';
import { FieldSetNode, SafeFieldSetNode } from './field-set';
import { GNode, SafeGNode } from './g';
import { ImageNode, SafeImageNode } from './image';
import { LineNode, SafeLineNode } from './line';
import { LinearGradientNode, SafeLinearGradientNode } from './linear-gradient';
import { LinkNode, SafeLinkNode } from './link';
import { NoteNode, SafeNoteNode } from './note';
import { PageNode, SafePageNode } from './page';
import { PathNode, SafePathNode } from './path';
import { PolygonNode, SafePolygonNode } from './polygon';
import { PolylineNode, SafePolylineNode } from './polyline';
import { RadialGradientNode, SafeRadialGradientNode } from './radial-gradient';
import { RectNode, SafeRectNode } from './rect';
import { ListNode, SafeListNode, SafeSelectNode, SelectNode } from './select';
import { SafeStopNode, StopNode } from './stop';
import { SafeSvgNode, SvgNode } from './svg';
import { SafeTextNode, TextNode } from './text';
import { SafeTextInputNode, TextInputNode } from './text-input';
import { SafeTextInstanceNode, TextInstanceNode } from './text-instance';
import { SafeTspanNode, TspanNode } from './tspan';
import { SafeViewNode, ViewNode } from './view';

export type Node =
  | DocumentNode
  | PageNode
  | ImageNode
  | SvgNode
  | CircleNode
  | ClipPathNode
  | DefsNode
  | EllipseNode
  | GNode
  | LineNode
  | LinearGradientNode
  | PathNode
  | PolygonNode
  | PolylineNode
  | RadialGradientNode
  | RectNode
  | StopNode
  | TspanNode
  | ViewNode
  | LinkNode
  | TextNode
  | TextInstanceNode
  | NoteNode
  | CanvasNode
  | FieldSetNode
  | TextInputNode
  | SelectNode
  | ListNode
  | CheckboxNode;

export type SafeNode =
  | SafeDocumentNode
  | SafePageNode
  | SafeImageNode
  | SafeSvgNode
  | SafeCircleNode
  | SafeClipPathNode
  | SafeDefsNode
  | SafeEllipseNode
  | SafeGNode
  | SafeLineNode
  | SafeLinearGradientNode
  | SafePathNode
  | SafePolygonNode
  | SafePolylineNode
  | SafeRadialGradientNode
  | SafeRectNode
  | SafeStopNode
  | SafeTspanNode
  | SafeViewNode
  | SafeLinkNode
  | SafeTextNode
  | SafeTextInstanceNode
  | SafeNoteNode
  | SafeCanvasNode
  | SafeFieldSetNode
  | SafeTextInputNode
  | SafeSelectNode
  | SafeListNode
  | SafeCheckboxNode;
