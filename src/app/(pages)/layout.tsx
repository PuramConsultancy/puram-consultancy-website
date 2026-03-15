import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApiProvider } from "../providers/ApiProvider";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.puramconsultancy.com"), // ← key fix
  title: {
    default: "Puram Consultancy — Business Growth Systems",
    template: "%s | Puram Consultancy",
  },
  description:
    "Puram Consultancy helps founders and teams build scalable business systems. Consistent leads, predictable revenue, and automated operations — globally.",
  keywords: [
    "Puram Consultancy",
    "business consultancy",
    "business growth systems",
    "business scaling",
    "strategic consulting",
    "lead generation systems",
    "operations consulting",
    "revenue growth",
    "business automation",
  ],
  authors: [
    { name: "Puram Consultancy", url: "https://www.puramconsultancy.com" },
  ],
  creator: "Puram Consultancy",
  publisher: "Puram Consultancy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.puramconsultancy.com",
    siteName: "Puram Consultancy",
    title: "Puram Consultancy — Business Growth Systems",
    description:
      "We build scalable systems that generate consistent leads, predictable revenue, and automated operations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Puram Consultancy — Business Growth Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puram Consultancy — Business Growth Systems",
    description:
      "We build scalable systems that generate consistent leads, predictable revenue, and automated operations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.puramconsultancy.com",
  },
  icons: {
    icon: "/image.png",
    apple: "/image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <ApiProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
