import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from './ProviderWrapper';
import TSQueryProvider from './TSQueryProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Able Pro Material UI React Dashboard Template',
  description: 'Able Pro Material UI React Dashboard Template'
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <TSQueryProvider>
            {children}
            <Toaster position="top-center" reverseOrder={true} />
          </TSQueryProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
