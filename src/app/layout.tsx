import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'GREEN·CALC — 화려한 웹 계산기',
  description:
    '정수/소수/양수/음수 사칙연산을 지원하는 네온 그린 레트로 계산기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/dseg@0.46.0/css/dseg.css"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
