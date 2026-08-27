import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'react-pdf — PDFs, made with React';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Geist reaches the site through next/font, which hands back a class name
 * rather than bytes, and Satori needs bytes. Roboto is already in public/fonts
 * for the docs examples.
 */
const font = (file: string) =>
  readFileSync(join(process.cwd(), 'public/fonts', file));

/** The hero's right-hand shard cluster, cropped out of its 1440x544 viewBox. */
const SHARDS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1094 0 346 544">
  <polygon points="1440,0 1198,0 1440,330" fill="rgba(242,35,0,0.32)"/>
  <polygon points="1440,0 1310,0 1440,120" fill="rgba(141,22,2,0.30)"/>
  <polygon points="1268,0 1198,0 1440,330 1440,392" fill="rgba(141,22,2,0.30)"/>
  <polygon points="1198,0 1156,0 1416,412 1440,392" fill="rgba(255,255,255,0.78)"/>
  <polygon points="1156,0 1120,0 1392,470 1416,412" fill="rgba(201,138,94,0.20)"/>
  <polygon points="1120,0 1094,0 1370,544 1392,470" fill="rgba(255,255,255,0.78)"/>
</svg>`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 88px',
          background: 'hsl(36, 14%, 98%)',
          color: 'hsl(0, 0%, 24.3%)',
          fontFamily: 'Roboto',
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(SHARDS).toString('base64')}`}
          width={400}
          height={630}
          style={{ position: 'absolute', top: 0, right: 0 }}
        />
        <div
          style={{ display: 'flex', fontSize: 76, letterSpacing: '-0.03em' }}
        >
          <span style={{ fontWeight: 700 }}>PDFs,</span>
          <span style={{ color: 'hsl(0, 0%, 43.1%)', margin: '0 18px' }}>
            made with
          </span>
          <span style={{ fontWeight: 700, color: 'hsl(8.7, 100%, 45.5%)' }}>
            React
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: 'hsl(0, 0%, 43.1%)',
            maxWidth: 540,
          }}
        >
          React renderer for creating PDF files on the browser and server.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Roboto', data: font('Roboto-Regular.ttf'), weight: 400 },
        { name: 'Roboto', data: font('Roboto-Bold.ttf'), weight: 700 },
      ],
    },
  );
}
