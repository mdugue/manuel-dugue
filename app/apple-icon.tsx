import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const INK = '#2a241d'
const PAPER = '#fbf8f1'

async function loadGaramondBold() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&text=MD',
    {
      headers: {
        'User-Agent': 'Wget/1.14 (linux-gnu)',
      },
    },
  ).then((r) => r.text())
  const match = css.match(
    /src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"]?truetype['"]?\)/,
  )
  if (!match) throw new Error('EB Garamond font URL not found')
  return fetch(match[1]).then((r) => r.arrayBuffer())
}

export default async function AppleIcon() {
  const fontData = await loadGaramondBold()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          color: INK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'EB Garamond',
          fontWeight: 700,
          fontSize: 84,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        MD
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'EB Garamond',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}
