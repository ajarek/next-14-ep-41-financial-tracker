import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
       <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
           <Navbar />
      {children}
      </ThemeProvider>
    </div>
  );
}
