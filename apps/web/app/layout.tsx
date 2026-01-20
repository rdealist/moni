import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n/config";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moni - Investment Portfolio",
  description: "Agile investment portfolio management for the modern investor",
  keywords: ["investment", "portfolio", "finance", "stocks", "crypto"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Redirect root to default locale
  const pathname = '';
  if (!pathname.startsWith(`/${defaultLocale}`)) {
    redirect(`/${defaultLocale}`);
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="system" storageKey="moni-theme">
            <div className="min-h-screen bg-gradient-subtle noise-overlay">
              {children}
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
