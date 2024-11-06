import 'styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Onix',
  description: 'A private and open source alternative to ChatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'black' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
