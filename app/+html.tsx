import type { PropsWithChildren } from 'react';

const adsenseClient = process.env.EXPO_PUBLIC_ADSENSE_CLIENT;

export default function RootHtml({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Live AI coding benchmark artifacts scored by editors and the community." />
        <meta property="og:site_name" content="MoobangBench" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MoobangBench — AI Coding Benchmarks" />
        <meta property="og:description" content="Compare what AI coding models and agent tools actually build." />
        {adsenseClient ? (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        ) : null}
      </head>
      <body style={{ margin: 0, backgroundColor: '#070A12' }}>{children}</body>
    </html>
  );
}
