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

const SITE_URL = "https://spacerace101.com";
const SITE_NAME = "Space Race 101";
const TITLE = "Space Race 101 — Interactive 3D Solar System & Space Mission Timeline";
const DESCRIPTION =
  "Explore every major space mission from 1957 to 2030 in an interactive 3D solar system. Track 50+ missions across NASA, SpaceX, China, India, Japan, and ESA. See planets, moons, rovers, and spacecraft in real-time orbital positions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Space Race 101",
  },
  description: DESCRIPTION,
  keywords: [
    "space race",
    "space timeline",
    "solar system",
    "3D solar system",
    "space missions",
    "NASA missions",
    "Artemis",
    "Apollo",
    "SpaceX",
    "moon landing",
    "Mars rover",
    "Curiosity",
    "Perseverance",
    "Voyager",
    "James Webb",
    "Chang'e",
    "Chandrayaan",
    "ISS",
    "space exploration history",
    "interactive space map",
    "planet positions",
    "space race 2024",
    "space race 2025",
    "new space race",
    "lunar missions",
    "space history",
  ],
  authors: [{ name: "Space Race 101" }],
  creator: "Space Race 101",
  publisher: "Space Race 101",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Space Race 101 — Interactive 3D Solar System showing planets and space missions from 1957 to 2030",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Science & Education",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Space Race 101",
    },
    about: {
      "@type": "Thing",
      name: "Space Exploration",
      description: "History of human space exploration from 1957 to 2030",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the new space race?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The new space race is the 21st century competition between multiple nations — the United States, China, India, Japan, and Europe — to explore the Moon, Mars, and deep space. Unlike the Cold War space race between the US and Soviet Union, today's race involves both government agencies and private companies like SpaceX.",
        },
      },
      {
        "@type": "Question",
        name: "How many countries have landed on the Moon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Five countries have achieved soft landings on the Moon: the United States (Apollo program, 1969-1972), the Soviet Union (Luna program, 1966-1976), China (Chang'e program, 2013-present), India (Chandrayaan-3, 2023), and Japan (SLIM, 2024).",
        },
      },
      {
        "@type": "Question",
        name: "What is the Artemis program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Artemis is NASA's program to return humans to the Moon. Artemis I (2022) was an uncrewed test flight. Artemis II sent four astronauts around the Moon. Artemis III plans to land the first woman and first person of color on the lunar surface near the south pole.",
        },
      },
      {
        "@type": "Question",
        name: "How many space missions have there been?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There have been thousands of space missions since 1957. Space Race 101 tracks over 50 of the most significant missions across 6 space agencies: NASA, Roscosmos, CNSA (China), ISRO (India), JAXA (Japan), and ESA (Europe).",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#06080d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: "#06080d", color: "#e8ecf1", margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
