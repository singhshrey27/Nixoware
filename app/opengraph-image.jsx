import { ImageResponse } from 'next/og';

export const alt = 'Nixoware — websites, digital products, and cloud solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', color: '#ffffff', background: '#071b31', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', fontSize: 54, color: '#79b7ff' }}>∞</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 42, letterSpacing: 1 }}>NIXOWARE</strong><span style={{ fontSize: 12, letterSpacing: 3, color: '#a9c4df' }}>INNOVATION • SOFTWARE • SERVICES</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}><span>Websites. Digital products.</span><span>Cloud solutions.</span></div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 24, color: '#bed1e5' }}>Web development · Product engineering · DevOps · Cloud management</div>
      </div>
      <div style={{ display: 'flex', width: '100%', height: 7, background: '#2863cf' }} />
    </div>,
    size
  );
}
