import { readFile } from 'node:fs/promises'
import path from 'node:path'
import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import type { Root, RootContent, PhrasingContent } from 'mdast'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingVertical: 48,
    paddingHorizontal: 56,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#111111',
  },
  h1: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  h2: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  h3: { fontSize: 13, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  paragraph: { marginBottom: 8 },
  strong: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  link: { color: '#0066cc', textDecoration: 'underline' },
  listItem: { flexDirection: 'row', marginBottom: 4 },
  bullet: { width: 12 },
  listItemContent: { flex: 1 },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginVertical: 12,
  },
  table: { marginBottom: 8, borderWidth: 1, borderColor: '#dddddd' },
  tableRow: { flexDirection: 'row' },
  tableCell: {
    flex: 1,
    padding: 6,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  tableHeaderCell: { backgroundColor: '#f5f5f5', fontWeight: 'bold' },
})

function renderInline(nodes: PhrasingContent[]): React.ReactNode {
  return nodes.map((node, i) => {
    switch (node.type) {
      case 'text':
        return <Text key={i}>{node.value}</Text>
      case 'strong':
        return (
          <Text key={i} style={styles.strong}>
            {renderInline(node.children)}
          </Text>
        )
      case 'emphasis':
        return (
          <Text key={i} style={styles.italic}>
            {renderInline(node.children)}
          </Text>
        )
      case 'inlineCode':
        return <Text key={i}>{node.value}</Text>
      case 'break':
        return <Text key={i}>{'\n'}</Text>
      case 'link':
        return (
          <Link key={i} src={node.url} style={styles.link}>
            {renderInline(node.children)}
          </Link>
        )
      default:
        return null
    }
  })
}

function renderBlock(node: RootContent, key: number): React.ReactNode {
  switch (node.type) {
    case 'heading': {
      const style =
        node.depth === 1 ? styles.h1 : node.depth === 2 ? styles.h2 : styles.h3
      return (
        <Text key={key} style={style}>
          {renderInline(node.children)}
        </Text>
      )
    }
    case 'paragraph':
      return (
        <Text key={key} style={styles.paragraph}>
          {renderInline(node.children)}
        </Text>
      )
    case 'list':
      return (
        <View key={key} style={{ marginBottom: 8 }}>
          {node.children.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>{node.ordered ? `${i + 1}.` : '•'}</Text>
              <View style={styles.listItemContent}>
                {item.children.map((child, j) =>
                  renderBlock(child as RootContent, j),
                )}
              </View>
            </View>
          ))}
        </View>
      )
    case 'table': {
      const rows = node.children
      return (
        <View key={key} style={styles.table}>
          {rows.map((row, ri) => (
            <View key={ri} style={styles.tableRow}>
              {row.children.map((cell, ci) => {
                const align = node.align?.[ci] ?? undefined
                return (
                  <Text
                    key={ci}
                    style={[
                      styles.tableCell,
                      ri === 0 ? styles.tableHeaderCell : {},
                      align ? { textAlign: align } : {},
                    ]}
                  >
                    {renderInline(cell.children)}
                  </Text>
                )
              })}
            </View>
          ))}
        </View>
      )
    }
    case 'thematicBreak':
      return <View key={key} style={styles.hr} />
    case 'blockquote':
      return (
        <View
          key={key}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: '#cccccc',
            paddingLeft: 8,
            marginBottom: 8,
          }}
        >
          {node.children.map((c, i) => renderBlock(c, i))}
        </View>
      )
    case 'code':
      return (
        <Text
          key={key}
          style={{
            fontFamily: 'Courier',
            fontSize: 10,
            backgroundColor: '#f5f5f5',
            padding: 6,
            marginBottom: 8,
          }}
        >
          {node.value}
        </Text>
      )
    default:
      return null
  }
}

function SkillProfileDocument({ tree }: { tree: Root }) {
  return (
    <Document
      title="Skill Profile — Manuel Dugué"
      author="Manuel Dugué"
      language="de-DE"
    >
      <Page size="A4" style={styles.page}>
        {tree.children.map((node, i) => renderBlock(node, i))}
        <Text
          fixed
          style={{
            position: 'absolute',
            bottom: 24,
            left: 56,
            right: 56,
            textAlign: 'center',
            fontSize: 9,
            color: '#888888',
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}

export async function GET() {
  const file = path.join(process.cwd(), 'public', 'skill-profile.md')
  const raw = await readFile(file, 'utf-8')
  const tree = remark().use(remarkGfm).parse(raw) as Root

  const buffer = await renderToBuffer(<SkillProfileDocument tree={tree} />)

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'inline; filename="skill-profile-manuel-dugue.pdf"',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
