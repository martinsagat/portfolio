import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_TITLE = 'Martin Sagat';
const DEFAULT_SUBTITLE = 'Senior Software Engineer';
const DEFAULT_TAGLINE = 'I build things for the web.';

const SIZE = { width: 1200, height: 630 };

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = clip(searchParams.get('title'), 80) ?? DEFAULT_TITLE;
  const subtitle = clip(searchParams.get('subtitle'), 100) ?? DEFAULT_SUBTITLE;
  const tagline = clip(searchParams.get('tagline'), 140) ?? DEFAULT_TAGLINE;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a182e',
          color: '#ccd6f6',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, rgba(100, 255, 218, 0.45) 0%, rgba(100, 255, 218, 0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, rgba(100, 255, 218, 0.28) 0%, rgba(100, 255, 218, 0) 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#64ffda',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#64ffda',
              display: 'flex',
            }}
          />
          martinsagat.com
        </div>

        <div
          style={{
            fontSize: title.length > 30 ? 84 : 104,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            display: 'flex',
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 38,
            fontWeight: 500,
            color: '#64ffda',
            letterSpacing: '-0.01em',
            display: 'flex',
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: '#8892b0',
            maxWidth: 880,
            lineHeight: 1.4,
            display: 'flex',
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#8892b0',
            fontSize: 22,
          }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {['React', 'TypeScript', 'Node', 'AWS', 'Claude'].map((t) => (
              <div
                key={t}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: '1.5px solid rgba(100, 255, 218, 0.35)',
                  color: '#ccd6f6',
                  display: 'flex',
                  fontWeight: 500,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ color: '#64ffda', fontWeight: 600, display: 'flex' }}>
            10+ yrs · multi-cloud
          </div>
        </div>
      </div>
    ),
    SIZE
  );
}

function clip(value: string | null, max: number): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}
