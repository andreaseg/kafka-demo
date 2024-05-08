import type { Metadata } from "next";
import "./globals.css";
import { ErrorAware } from "@/components/error";

import grid from "./grid.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kafka Demo Webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorAware>
          <main className={grid.main}>
            <h1 className={grid.header}>
              Kafka Demo
            </h1>


            <div className={grid.info}>

              <Link href="/">Forside</Link>

              <Link href="/geek">Teknisk informasjon</Link>

              <a href="http://localhost:9021/clusters" target="_blank" rel="noopener noreferrer">Kafka control center↗</a>

              <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">Backend tjeneste↗</a>

            </div>

            {children}

          </main>
        </ErrorAware>
      </body>
    </html>
  );
}
