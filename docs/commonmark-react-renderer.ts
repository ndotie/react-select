declare module 'commonmark-react-renderer' {
  import React from 'react';
  import { Node } from 'commonmark';

  namespace ReactRenderer {
    export interface CommonProps {
      nodeKey: string;
      literal: string | null;
      children: React.ReactElement;
      'data-sourcepos'?: string;
    }

    export interface HtmlInlineBlockProps extends CommonProps {
      isBlock: boolean;
      escapeHtml: boolean;
      skipHtml: boolean;
    }

    export interface CodeBlockProps extends CommonProps {
      language?: string;
      codeinfo?: string[];
    }

    export interface CodeProps extends CommonProps {
      inline: boolean;
    }

    export interface HeadingProps extends CommonProps {
      level: number;
    }

    export interface SoftBreakProps extends CommonProps {
      softBreak: string;
    }

    export interface LinkProps extends CommonProps {
      href: string;
      title: string | undefined;
      target?: string;
    }

    export interface ImageProps extends CommonProps {
      src: string;
      title: string | undefined;
      alt: string;
    }

    export interface ListProps extends CommonProps {
      start: number;
      type: string;
      tight: boolean;
    }

    export interface Renderers {
      Blockquote: string | React.ComponentType<CommonProps> | null;
      Emph: string | React.ComponentType<CommonProps> | null;
      Linebreak: string | React.ComponentType<CommonProps> | null;
      Image: string | React.ComponentType<ImageProps> | null;
      Item: string | React.ComponentType<CommonProps> | null;
      Link: string | React.ComponentType<LinkProps> | null;
      Paragraph: string | React.ComponentType<CommonProps> | null;
      Strong: string | React.ComponentType<CommonProps> | null;
      ThematicBreak: string | React.ComponentType<CommonProps> | null;
      HtmlBlock: string | React.ComponentType<HtmlInlineBlockProps> | null;
      HtmlInline: string | React.ComponentType<HtmlInlineBlockProps> | null;
      List: string | React.ComponentType<ListProps> | null;
      CodeBlock: string | React.ComponentType<CodeBlockProps> | null;
      Code: string | React.ComponentType<CodeProps> | null;
      Heading: string | React.ComponentType<HeadingProps> | null;
      Text: string | React.ComponentType<CommonProps> | null;
      Softbreak: string | React.ComponentType<SoftBreakProps> | null;
    }

    export interface Options {
      sourcePos?: boolean;
      escapeHtml?: boolean;
      skipHtml?: boolean;
      softBreak?: string;
      allowedTypes?: string[];
      disallowedTypes?: string[];
      unwrapDisallowed?: boolean;
      allowNode?: (node: {
        type: string;
        renderer: string;
        props: unknown;
        children: unknown[];
      }) => unknown;
      renderers?: Partial<Renderers>;
      transformLinkUri?: ((uri: string) => string) | null;
      transformImageUri?: ((uri: string) => string) | null;
      linkTarget?: string;
    }
  }

  interface ReactRenderer {
    new (options?: ReactRenderer.Options): {
      sourcePos: boolean;
      softBreak: string;
      renderers: ReactRenderer.Renderers;
      escapeHtml: boolean;
      skipHtml: boolean;
      transformLinUri: ((uri: string) => string) | null;
      transformImageUri: ((uri: string) => string) | null;
      allowNode:
        | ((node: {
            type: string;
            renderer: string;
            props: unknown;
            children: React.ReactNode[];
          }) => unknown)
        | undefined;
      allowedTypes: string[];
      unwrapDisallowed: boolean;
      render: (root: Node) => React.ReactNode;
      linkTarget: string | false;
    };
    uriTransformer: (uri: string) => string;
    types: string[];
    renderers: ReactRenderer.Renderers;
  }

  const ReactRenderer: ReactRenderer;

  export = ReactRenderer;
}