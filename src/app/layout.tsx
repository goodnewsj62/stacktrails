import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Bebas_Neue, Lexend } from "next/font/google";
import theme from "../theme";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StackTrails",
  description:
    "A Public peer learning platform for sharing currated/aggregated courses.  Built for the community, by the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${lexend.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

        <a href="https://storyset.com/education" className="hidden">
          Education illustrations by Storyset
        </a>
        <a href="https://storyset.com/people" className="hidden">
          People illustrations by Storyset
        </a>
        <a href="https://storyset.com/work" className="hidden">
          Work illustrations by Storyset
        </a>
        <a href="https://storyset.com/communication" className="hidden">
          Communication illustrations by Storyset
        </a>
        <a href="https://storyset.com/data" className="hidden">
          Data illustrations by Storyset
        </a>
        <a href="https://storyset.com/home" className="hidden">
          Home illustrations by Storyset
        </a>
      </body>
    </html>
  );
}
