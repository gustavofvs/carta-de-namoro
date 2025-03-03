import type { Metadata } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carta de Amor | Um Pedido Especial",
  description: "Uma declaração especial de amor para a pessoa mais importante da minha vida",
  keywords: ["amor", "namoro", "romance", "pedido", "declaração"],
  authors: [{ name: "Gustavo Fernandes Vieira da Silva" }],
  openGraph: {
    title: "Carta de Amor | Um Pedido Especial",
    description: "Uma declaração especial de amor para a pessoa mais importante da minha vida",
  },
  themeColor: "#ff66b2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${dancingScript.variable} ${montserrat.variable} font-montserrat bg-gradient-to-br from-pink-100 to-purple-100`}>
        <div className="min-h-screen relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
