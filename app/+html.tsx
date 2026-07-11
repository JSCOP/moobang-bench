import type { PropsWithChildren } from 'react';

const adsenseClient = process.env.EXPO_PUBLIC_ADSENSE_CLIENT;

const globalCss = `
html { background: #0f0f0f; }
body { margin: 0; background: #0f0f0f; color: #f4f4f3; }
#root { min-height: 100vh; }
#root * {
  font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, -apple-system, sans-serif;
}
.mb-shell { display: flex; min-height: 100vh; }
.mb-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #0a0a0a;
  border-right: 1px solid #242424;
  overflow-y: auto;
  z-index: 30;
}
.mb-main {
  flex: 1;
  min-width: 0;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.mb-mobilebar { display: none; }
.mb-menu > summary {
  list-style: none;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid #242424;
  border-radius: 6px;
  color: #9b9b98;
  font-size: 13px;
  font-weight: 600;
}
.mb-menu > summary::-webkit-details-marker { display: none; }
.mb-menu[open] > summary { color: #f4f4f3; border-color: #303030; }
.mb-demo-button {
  position: relative;
  display: block;
  overflow: hidden;
  background: #080808;
  cursor: pointer;
  text-decoration: none;
}
.mb-demo-button img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 160ms ease, opacity 160ms ease;
}
.mb-demo-button:hover img,
.mb-demo-button:focus-visible img {
  transform: scale(1.015);
  opacity: 0.78;
}
.mb-demo-button:focus-visible { outline: 2px solid #e2a33d; outline-offset: -2px; }
.mb-demo-label {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 7px 10px;
  border-radius: 6px;
  color: #141414;
  background: #e2a33d;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
}
@media (max-width: 899px) {
  .mb-sidebar { display: none; }
  .mb-main { margin-left: 0; }
  .mb-mobilebar {
    display: block;
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(10, 10, 10, 0.97);
    border-bottom: 1px solid #242424;
  }
}
`;

export default function RootHtml({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Live AI coding benchmark artifacts scored by editors and the community." />
        <meta name="theme-color" content="#0f0f0f" />
        <meta property="og:site_name" content="MoobangBench" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MoobangBench — AI Coding Benchmarks" />
        <meta property="og:description" content="Compare what AI coding models and agent tools actually build." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
        {adsenseClient ? (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
