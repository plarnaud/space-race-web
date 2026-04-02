import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The New Space Race",
  description:
    "Explore 70 years of space exploration. From Sputnik to Artemis, watch the space race unfold in an interactive 3D timeline.",
  openGraph: {
    title: "The New Space Race",
    description:
      "Explore 70 years of space exploration in an interactive 3D timeline.",
    type: "website",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: "#06080d", color: "#e8ecf1", margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
