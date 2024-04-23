import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorAware } from "@/components/error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kafka Demo: Webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorAware>
          {children}
        </ErrorAware>
      </body>
    </html>
  );
}
