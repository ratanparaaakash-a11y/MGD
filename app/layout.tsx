import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://mgdgames.ai"),

  title: "Mukta Game & Development",

  description:
    "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",

  icons: {
    icon: "/mukta-logo-trans.png",
  },

  openGraph: {
    title: "Mukta Game & Development",
    description:
      "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",
    url: "https://mgdgames.ai",
    siteName: "Mukta Game & Development",
    images: [
      {
        url: "https://mgdgames.ai/card.png",
        width: 1200,
        height: 630,
        alt: "Mukta Game & Development Studio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mukta Game & Development",
    description:
      "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",
    images: ["https://mgdgames.ai/card.png"],
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
    canonical: "https://mgdgames.ai",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SplashScreen />
        <div className="showcase-shell">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
