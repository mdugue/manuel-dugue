import {
  Document,
  Font,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { PhrasingContent, Root, RootContent } from "mdast";
import { notFound } from "next/navigation";
import type React from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { hasLocale, type Locale } from "@/i18n/config";
import { type Dictionary, getDictionary } from "@/i18n/dictionaries";
import { readMarkdown } from "./markdown-source";

const GARAMOND = "https://fonts.gstatic.com/s/ebgaramond/v32";
const JETBRAINS = "https://fonts.gstatic.com/s/jetbrainsmono/v24";

Font.register({
  family: "Garamond",
  fonts: [
    {
      src: `${GARAMOND}/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUAw.ttf`,
      fontWeight: 400,
    },
    {
      src: `${GARAMOND}/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96.ttf`,
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: `${GARAMOND}/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-NfNUAw.ttf`,
      fontWeight: 600,
    },
    {
      src: `${GARAMOND}/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7diR496.ttf`,
      fontWeight: 600,
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Mono",
  fonts: [
    {
      src: `${JETBRAINS}/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf`,
      fontWeight: 400,
    },
    {
      src: `${JETBRAINS}/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf`,
      fontWeight: 500,
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const INK = "#1a1a1a";
const INK_SOFT = "#555555";
const INK_FAINT = "#888888";
const RULE = "#cccccc";
const RULE_SOFT = "#e6e0d6";
const ACCENT = "#2d4a8a";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 54,
    paddingBottom: 64,
    paddingHorizontal: 56,
    fontFamily: "Garamond",
    fontSize: 11,
    lineHeight: 1.5,
    color: INK,
  },

  letterhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1.5,
    borderBottomColor: INK,
    paddingBottom: 12,
    marginBottom: 28,
    gap: 24,
  },
  letterheadLeft: { flexShrink: 1 },
  letterheadUrl: {
    fontFamily: "Mono",
    fontSize: 8,
    letterSpacing: 1.6,
    color: INK_FAINT,
    textTransform: "uppercase",
    marginBottom: 6,
    paddingBottom: 4,
  },
  letterheadUrlTld: { color: ACCENT, fontWeight: 500 },
  letterheadName: {
    fontFamily: "Garamond",
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: 600,
  },
  letterheadNameAccent: { color: ACCENT, fontStyle: "normal" },
  letterheadContact: {
    fontFamily: "Mono",
    fontSize: 7.5,
    letterSpacing: 1.1,
    color: INK_SOFT,
    textTransform: "uppercase",
    textAlign: "right",
    lineHeight: 1.7,
  },

  titleBlock: { marginBottom: 28 },
  title: {
    fontFamily: "Garamond",
    fontStyle: "italic",
    fontSize: 36,
    lineHeight: 1.02,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Garamond",
    fontStyle: "italic",
    fontSize: 13,
    color: INK_SOFT,
  },

  h2: {
    fontFamily: "Mono",
    fontSize: 8.5,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: 500,
    color: INK,
    borderTopWidth: 0.5,
    borderTopColor: RULE_SOFT,
    paddingTop: 18,
    marginTop: 22,
    marginBottom: 12,
  },
  h2First: { borderTopWidth: 0, paddingTop: 0, marginTop: 0 },
  h3: {
    fontFamily: "Garamond",
    fontSize: 12,
    fontWeight: 600,
    marginTop: 12,
    marginBottom: 3,
  },
  h4: {
    fontFamily: "Garamond",
    fontStyle: "italic",
    fontSize: 11,
    color: INK_SOFT,
    marginBottom: 4,
  },

  paragraph: { marginBottom: 6 },
  strong: { fontWeight: 600 },
  italic: { fontStyle: "italic" },
  inlineCode: {
    fontFamily: "Mono",
    fontSize: 9.5,
    color: INK,
  },
  link: { color: ACCENT, textDecoration: "underline" },

  list: { marginBottom: 8, marginTop: 2 },
  listItem: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 12, color: INK_SOFT },
  listItemContent: { flex: 1 },

  hr: {
    borderBottomWidth: 0.5,
    borderBottomColor: RULE_SOFT,
    marginVertical: 16,
  },

  table: { marginTop: 6, marginBottom: 14 },
  tableRow: { flexDirection: "row" },
  tableCell: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: RULE_SOFT,
    fontSize: 10.5,
  },
  tableHeaderCell: {
    fontFamily: "Mono",
    fontSize: 8,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    fontWeight: 500,
    color: INK_SOFT,
    borderBottomWidth: 0.75,
    borderBottomColor: INK,
  },
  tableHeaderCellEmpty: {
    borderBottomWidth: 0.75,
    borderBottomColor: INK,
    paddingVertical: 3,
  },

  blockquote: {
    borderLeftWidth: 1.5,
    borderLeftColor: ACCENT,
    paddingLeft: 10,
    marginVertical: 8,
    color: INK_SOFT,
    fontStyle: "italic",
  },

  codeBlock: {
    fontFamily: "Mono",
    fontSize: 9.5,
    marginVertical: 8,
    paddingLeft: 10,
    borderLeftWidth: 0.5,
    borderLeftColor: RULE,
    color: INK_SOFT,
  },

  footerRule: {
    position: "absolute",
    bottom: 44,
    left: 56,
    right: 56,
    borderTopWidth: 0.5,
    borderTopColor: RULE_SOFT,
    height: 0,
  },
  footerLeft: {
    position: "absolute",
    bottom: 28,
    left: 56,
    fontFamily: "Mono",
    fontSize: 7.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: INK_FAINT,
  },
  footerRight: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    fontFamily: "Mono",
    fontSize: 7.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: INK_FAINT,
    textAlign: "right",
  },
  footerRightTld: {
    color: ACCENT,
    fontWeight: 500,
  },
});

function renderInline(nodes: PhrasingContent[]): React.ReactNode {
  return nodes.map((node, i) => {
    switch (node.type) {
      case "text":
        return <Text key={i}>{node.value}</Text>;
      case "strong":
        return (
          <Text key={i} style={styles.strong}>
            {renderInline(node.children)}
          </Text>
        );
      case "emphasis":
        return (
          <Text key={i} style={styles.italic}>
            {renderInline(node.children)}
          </Text>
        );
      case "inlineCode":
        return (
          <Text key={i} style={styles.inlineCode}>
            {node.value}
          </Text>
        );
      case "break":
        return <Text key={i}>{"\n"}</Text>;
      case "link":
        return (
          <Link key={i} src={node.url} style={styles.link}>
            {renderInline(node.children)}
          </Link>
        );
      default:
        return null;
    }
  });
}

function renderBlock(
  node: RootContent,
  key: number,
  ctx: { isFirstH2: { current: boolean } }
): React.ReactNode {
  switch (node.type) {
    case "heading": {
      if (node.depth === 1) {
        return null;
      }
      if (node.depth === 2) {
        const first = ctx.isFirstH2.current;
        ctx.isFirstH2.current = false;
        return (
          <Text
            key={key}
            minPresenceAhead={80}
            style={first ? [styles.h2, styles.h2First] : styles.h2}
            wrap={false}
          >
            {renderInline(node.children)}
          </Text>
        );
      }
      if (node.depth === 3) {
        return (
          <Text key={key} minPresenceAhead={60} style={styles.h3} wrap={false}>
            {renderInline(node.children)}
          </Text>
        );
      }
      return (
        <Text key={key} style={styles.h4} wrap={false}>
          {renderInline(node.children)}
        </Text>
      );
    }
    case "paragraph":
      return (
        <Text key={key} style={styles.paragraph}>
          {renderInline(node.children)}
        </Text>
      );
    case "list":
      return (
        <View key={key} style={styles.list}>
          {node.children.map((item, i) => (
            <View key={i} style={styles.listItem} wrap={false}>
              <Text style={styles.bullet}>
                {node.ordered ? `${i + 1}.` : "•"}
              </Text>
              <View style={styles.listItemContent}>
                {item.children.map((child, j) =>
                  renderBlock(child as RootContent, j, ctx)
                )}
              </View>
            </View>
          ))}
        </View>
      );
    case "table": {
      const headerCells = node.children[0]?.children ?? [];
      const headerIsEmpty = headerCells.every(
        (cell) => cell.children.length === 0
      );
      return (
        <View key={key} style={styles.table}>
          {node.children.map((row, ri) => {
            const isHeader = ri === 0;
            return (
              <View key={ri} style={styles.tableRow}>
                {row.children.map((cell, ci) => {
                  const align = node.align?.[ci] ?? undefined;
                  let headerPart: Style = {};
                  if (isHeader) {
                    headerPart = headerIsEmpty
                      ? styles.tableHeaderCellEmpty
                      : styles.tableHeaderCell;
                  }
                  return (
                    <Text
                      key={ci}
                      style={[
                        styles.tableCell,
                        headerPart,
                        align ? { textAlign: align } : {},
                      ]}
                    >
                      {renderInline(cell.children)}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
      );
    }
    case "thematicBreak":
      return <View key={key} style={styles.hr} />;
    case "blockquote":
      return (
        <View key={key} style={styles.blockquote}>
          {node.children.map((child, i) => renderBlock(child, i, ctx))}
        </View>
      );
    case "code":
      return (
        <Text key={key} style={styles.codeBlock}>
          {node.value}
        </Text>
      );
    default:
      return null;
  }
}

interface DocMeta {
  sheetSubtitle: string;
  sheetTitle: string;
}

function MarkdownDocument({
  tree,
  docTitle,
  author,
  language,
  meta,
  contact,
  footerLead,
}: {
  tree: Root;
  docTitle: string;
  author?: string;
  language: Locale;
  meta: DocMeta;
  contact: readonly string[];
  footerLead: string;
}) {
  const ctx = { isFirstH2: { current: true } };
  return (
    <Document author={author} language={language} title={docTitle}>
      <Page size="A4" style={styles.page}>
        <View style={styles.letterhead}>
          <View style={styles.letterheadLeft}>
            <Text style={styles.letterheadUrl}>
              manuel<Text style={styles.letterheadUrlTld}>.fyi</Text>
            </Text>
          </View>
          <View style={styles.letterheadContact}>
            {contact.map((line, i) => (
              <Text key={i}>{line}</Text>
            ))}
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{meta.sheetTitle}</Text>
          <Text style={styles.subtitle}>{meta.sheetSubtitle}</Text>
        </View>

        {tree.children.map((node, i) => renderBlock(node, i, ctx))}

        <View fixed style={styles.footerRule} />
        <Text fixed style={styles.footerLeft}>
          {footerLead}
        </Text>
        <Text fixed style={styles.footerRight}>
          manuel<Text style={styles.footerRightTld}>.fyi</Text>
        </Text>
      </Page>
    </Document>
  );
}

export type LocalizedString = Record<Locale, string>;

export interface MarkdownPdfRouteConfig {
  author?: string;
  filenameBase: string;
  getDocMeta: (dict: Dictionary) => DocMeta;
  slug: string;
}

export function createMarkdownPdfRoute(config: MarkdownPdfRouteConfig) {
  const { slug, filenameBase, author, getDocMeta } = config;

  return async function GET(
    _request: Request,
    { params }: { params: Promise<{ lang: string }> }
  ) {
    const { lang } = await params;
    if (!hasLocale(lang)) {
      notFound();
    }

    const dict = await getDictionary(lang);
    const meta = getDocMeta(dict);
    const raw = await readMarkdown(slug, lang);
    const tree = remark().use(remarkGfm).parse(raw);

    const docTitle = author
      ? `${meta.sheetTitle} — ${author}`
      : meta.sheetTitle;
    const footerLead = author
      ? `${author} · mail@manuel.fyi`
      : "mail@manuel.fyi";

    const buffer = await renderToBuffer(
      <MarkdownDocument
        author={author}
        contact={dict.portfolio.contact}
        docTitle={docTitle}
        footerLead={footerLead}
        language={lang}
        meta={meta}
        tree={tree}
      />
    );

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filenameBase}.${lang}.pdf"`,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  };
}
