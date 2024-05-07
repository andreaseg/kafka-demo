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
            {children}

            <div className={grid.info}>
              <p>
                <Link href="/">Forside</Link>
              </p>
              <p>
                <Link href="/geek">Teknisk informasjon</Link>
              </p>

              <h2>Eksterne lenker</h2>

              <p>
                Oversikt over kafka-kø
                <br />
                <a href="http://localhost:9021/clusters">Kafka control center</a>
              </p>

              <p>
                Grensesnitt for backend
                <br />
                <a href="http://localhost:8080">Backend tjeneste</a>
              </p>


            </div>

          </main>
        </ErrorAware>
      </body>
    </html>
  );
}
