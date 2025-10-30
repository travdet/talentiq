import './globals.css';
import React from 'react';

export const metadata = {
  title: 'TalentIQ',
  description: 'Find the right actor. Instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-7xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-black" />
              <div>
                <h1 className="text-xl font-bold">TalentIQ</h1>
                <p className="text-xs text-gray-500">Find the right actor. Instantly.</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4">{children}</main>
        <footer className="mx-auto max-w-7xl p-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} TalentIQ
        </footer>
      </body>
    </html>
  );
}
