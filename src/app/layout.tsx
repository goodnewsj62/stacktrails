import AuthWrapper from "@/components/auth/AuthWrapper";
import Providers from "@/lib/QueryProvider";
import { StoreProvider } from "@/store/provider";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Bebas_Neue, Lexend } from "next/font/google";
import { Toaster } from "sonner";
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
            <NextIntlClientProvider>
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              >
                <StoreProvider>
                  <Providers>
                    <AuthWrapper>
                      {children}
                      <Toaster expand position="top-right" />
                    </AuthWrapper>
                  </Providers>
                </StoreProvider>
              </GoogleOAuthProvider>
            </NextIntlClientProvider>
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
        <a href="https://storyset.com/space" className="hidden">
          Space illustrations by Storyset
        </a>
        <a href="https://storyset.com/multi-purpose" className="hidden">
          Multi-purpose illustrations by Storyset
        </a>
        <a href="https://storyset.com/transport" className="hidden">
          Transport illustrations by Storyset
        </a>
        <a href="https://storyset.com/celebration" className="hidden">
          Celebration illustrations by Storyset
        </a>
        {/* <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script> */}
      </body>
    </html>
  );
}
