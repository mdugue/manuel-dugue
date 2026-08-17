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
import { getDictionary } from "@/i18n/dictionaries";
import { AUTHOR, DOCUMENTS, type DocMeta, type DocSlug } from "./doc-registry";
import { formatUpdatedDate, readMarkdownSource } from "./markdown-source";

const GARAMOND = "https://fonts.gstatic.com/s/ebgaramond/v32";
const JETBRAINS = "https://fonts.gstatic.com/s/jetbrainsmono/v24";

Font.register({
  family: "Garamond",
  fonts: [
    {
      fontWeight: 400,
      src: `${GARAMOND}/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUAw.ttf`,
    },
    {
      fontStyle: "italic",
      fontWeight: 400,
      src: `${GARAMOND}/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96.ttf`,
    },
    {
      fontWeight: 600,
      src: `${GARAMOND}/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-NfNUAw.ttf`,
    },
    {
      fontStyle: "italic",
      fontWeight: 600,
      src: `${GARAMOND}/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7diR496.ttf`,
    },
  ],
});

Font.register({
  family: "Mono",
  fonts: [
    {
      fontWeight: 400,
      src: `${JETBRAINS}/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf`,
    },
    {
      fontWeight: 500,
      src: `${JETBRAINS}/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf`,
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
  blockquote: {
    borderLeftColor: ACCENT,
    borderLeftWidth: 1.5,
    color: INK_SOFT,
    fontStyle: "italic",
    marginVertical: 8,
    paddingLeft: 10,
  },
  bullet: { color: INK_SOFT, width: 12 },

  codeBlock: {
    borderLeftColor: RULE,
    borderLeftWidth: 0.5,
    color: INK_SOFT,
    fontFamily: "Mono",
    fontSize: 9.5,
    marginVertical: 8,
    paddingLeft: 10,
  },
  footerLeft: {
    bottom: 28,
    color: INK_FAINT,
    fontFamily: "Mono",
    fontSize: 7.5,
    left: 56,
    letterSpacing: 1.1,
    position: "absolute",
    textTransform: "uppercase",
  },
  footerRight: {
    bottom: 28,
    color: INK_FAINT,
    fontFamily: "Mono",
    fontSize: 7.5,
    left: 56,
    letterSpacing: 1.1,
    position: "absolute",
    right: 56,
    textAlign: "right",
    textTransform: "uppercase",
  },
  footerRightTld: {
    color: ACCENT,
    fontWeight: 500,
  },

  footerRule: {
    borderTopColor: RULE_SOFT,
    borderTopWidth: 0.5,
    bottom: 44,
    height: 0,
    left: 56,
    position: "absolute",
    right: 56,
  },

  h2: {
    borderTopColor: RULE_SOFT,
    borderTopWidth: 0.5,
    color: INK,
    fontFamily: "Mono",
    fontSize: 8.5,
    fontWeight: 500,
    letterSpacing: 1.8,
    marginBottom: 12,
    marginTop: 22,
    paddingTop: 18,
    textTransform: "uppercase",
  },
  h2First: { borderTopWidth: 0, marginTop: 0, paddingTop: 0 },
  h3: {
    fontFamily: "Garamond",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 3,
    marginTop: 12,
  },
  h4: {
    color: INK_SOFT,
    fontFamily: "Garamond",
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 4,
  },

  hr: {
    borderBottomColor: RULE_SOFT,
    borderBottomWidth: 0.5,
    marginVertical: 16,
  },
  inlineCode: {
    color: INK,
    fontFamily: "Mono",
    fontSize: 9.5,
  },
  italic: { fontStyle: "italic" },

  letterhead: {
    alignItems: "flex-start",
    borderBottomColor: INK,
    borderBottomWidth: 1.5,
    flexDirection: "row",
    gap: 24,
    justifyContent: "space-between",
    marginBottom: 28,
    paddingBottom: 12,
  },
  letterheadContact: {
    color: INK_SOFT,
    fontFamily: "Mono",
    fontSize: 7.5,
    letterSpacing: 1.1,
    lineHeight: 1.7,
    textAlign: "right",
    textTransform: "uppercase",
  },
  letterheadLeft: { flexShrink: 1 },
  letterheadName: {
    fontFamily: "Garamond",
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: 600,
  },
  letterheadNameAccent: { color: ACCENT, fontStyle: "normal" },
  letterheadUrl: {
    color: INK_FAINT,
    fontFamily: "Mono",
    fontSize: 8,
    letterSpacing: 1.6,
    marginBottom: 6,
    paddingBottom: 4,
    textTransform: "uppercase",
  },
  letterheadUrlTld: { color: ACCENT, fontWeight: 500 },
  link: { color: ACCENT, textDecoration: "underline" },

  list: { marginBottom: 8, marginTop: 2 },
  listItem: { flexDirection: "row", marginBottom: 2 },
  listItemContent: { flex: 1 },
  page: {
    color: INK,
    flexDirection: "column",
    fontFamily: "Garamond",
    fontSize: 11,
    lineHeight: 1.5,
    paddingBottom: 64,
    paddingHorizontal: 56,
    paddingTop: 54,
  },

  paragraph: { marginBottom: 6 },
  strong: { fontWeight: 600 },
  subtitle: {
    color: INK_SOFT,
    fontFamily: "Garamond",
    fontSize: 13,
    fontStyle: "italic",
  },

  table: { marginBottom: 14, marginTop: 6 },
  tableCell: {
    borderBottomColor: RULE_SOFT,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 10.5,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  tableHeaderCell: {
    borderBottomColor: INK,
    borderBottomWidth: 0.75,
    color: INK_SOFT,
    fontFamily: "Mono",
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  tableHeaderCellEmpty: {
    borderBottomColor: INK,
    borderBottomWidth: 0.75,
    paddingVertical: 3,
  },
  tableRow: { flexDirection: "row" },
  title: {
    fontFamily: "Garamond",
    fontSize: 36,
    fontStyle: "italic",
    lineHeight: 1.02,
    marginBottom: 8,
  },

  titleBlock: { marginBottom: 28 },
  updatedLine: {
    color: INK_FAINT,
    fontFamily: "Mono",
    fontSize: 7.5,
    letterSpacing: 1.1,
    marginTop: 8,
    textTransform: "uppercase",
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

function MarkdownDocument({
  tree,
  docTitle,
  language,
  meta,
  contact,
  updatedLine,
}: {
  tree: Root;
  docTitle: string;
  language: Locale;
  meta: DocMeta;
  contact: readonly string[];
  updatedLine?: string;
}) {
  const ctx = { isFirstH2: { current: true } };
  return (
    <Document author={AUTHOR} language={language} title={docTitle}>
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
          {updatedLine ? (
            <Text style={styles.updatedLine}>{updatedLine}</Text>
          ) : null}
        </View>

        {tree.children.map((node, i) => renderBlock(node, i, ctx))}

        <View fixed style={styles.footerRule} />
        <Text fixed style={styles.footerLeft}>
          {`${AUTHOR} · mail@manuel.fyi`}
        </Text>
        <Text fixed style={styles.footerRight}>
          manuel<Text style={styles.footerRightTld}>.fyi</Text>
        </Text>
      </Page>
    </Document>
  );
}

export type LocalizedString = Record<Locale, string>;

export function createMarkdownPdfRoute(slug: DocSlug) {
  return async function GET(
    _request: Request,
    { params }: { params: Promise<{ lang: string }> }
  ) {
    // Route Handlers cannot read `next/root-params`, so the locale comes from
    // the route params here.
    const { lang } = await params;
    if (!hasLocale(lang)) {
      notFound();
    }

    const dict = await getDictionary(lang);
    const meta = DOCUMENTS[slug].meta(dict);
    const { body, meta: source } = readMarkdownSource(slug, lang);
    const tree = remark().use(remarkGfm).parse(body);

    const updatedLine = source.updatedIso
      ? `${dict.portfolio.docs.updatedLabel} ${formatUpdatedDate(source.updatedIso, lang)}`
      : undefined;

    const buffer = await renderToBuffer(
      <MarkdownDocument
        contact={dict.portfolio.contact}
        docTitle={`${meta.sheetTitle} — ${AUTHOR}`}
        language={lang}
        meta={meta}
        tree={tree}
        updatedLine={updatedLine}
      />
    );

    const lastModified = source.updatedIso
      ? new Date(source.updatedIso).toUTCString()
      : undefined;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Content-Disposition": `inline; filename="${slug}-manuel-dugue.${lang}.pdf"`,
        "Content-Type": "application/pdf",
        ...(lastModified ? { "Last-Modified": lastModified } : {}),
      },
      status: 200,
    });
  };
}
