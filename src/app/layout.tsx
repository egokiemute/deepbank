import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Provider from "@/providers/SessionProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const aeonik = localFont({
  src: [
    {
      path: "./fonts/Aeonik-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flextable.co"),
  keywords: ["flextable", "co-work space", "event hall", "restaurants", "spaces", "coworking", "remote work", "flexible workspaces"],
  title: {
    template: `%s | Flextable.co`,
    default: "Flextable.co",
  },
  description: "Wherever work takes you, we'll find the space.",
  openGraph: {
    title: "Flextable.co",
    description: "Wherever work takes you, we'll find the space.",
    images: [
      {
        url: "/images/thumbnail.webp",
        alt: "flextable.co",
      },
    ],
  },
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={` ${aeonik.variable} antialiased`}>
        <ReactQueryProvider>
          <Provider>
            <main className="bg-icon-strong-inverse">{children}</main>
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
