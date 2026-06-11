import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/layout/PageLoader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import CommandPalette from "@/components/layout/CommandPalette";
import RecruiterDock from "@/components/layout/RecruiterDock";
import EasterEggManager from "@/components/layout/EasterEggManager";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhargavbhat.dev"),
  title: "Bhargav Bhat | Premium Portfolio & Full Stack Engineer",
  description: "Explore the software engineering portfolio of Bhargav Bhat. Specializing in Java Spring Boot backend architectures, scalable microservices, and modern React frontend web applications.",
  keywords: ["Bhargav Bhat", "Software Engineer", "Full Stack Engineer", "Java Backend Architect", "Spring Boot", "React Developer", "VitaGuard", "Developer Portfolio"],
  authors: [{ name: "Bhargav Bhat", url: "https://github.com/bhargavbhat18" }],
  creator: "Bhargav Bhat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhargavbhat.dev",
    title: "Bhargav Bhat | Premium Portfolio & Full Stack Engineer",
    description: "Explore the software engineering portfolio of Bhargav Bhat. Specializing in Java Spring Boot, scalable microservices, and React web apps.",
    siteName: "Bhargav Bhat Portfolio",
    images: [
      {
        url: "/avatar-male.png",
        width: 800,
        height: 800,
        alt: "Bhargav Bhat avatar image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhargav Bhat | Premium Portfolio",
    description: "Explore the software engineering portfolio of Bhargav Bhat. Specializing in Java Spring Boot, scalable microservices, and React.",
    images: ["/avatar-male.png"],
    creator: "@bhargavbhat",
  },
  alternates: {
    canonical: "https://bhargavbhat.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Bhargav Bhat",
              "jobTitle": "Software Engineer & Full Stack Engineer",
              "url": "https://bhargavbhat.dev",
              "sameAs": [
                "https://github.com/bhargavbhat18",
                "https://linkedin.com/in/bhargavbhat18"
              ],
              "knowsAbout": [
                "Software Engineering",
                "Java",
                "Spring Boot",
                "REST APIs",
                "MySQL",
                "React.js",
                "Next.js",
                "Python",
                "Full Stack Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance / Open Source"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden relative">
        {/* Global Page Loader */}
        <PageLoader />
        
        {/* Global Scroll Progress */}
        <ScrollProgress />

        {/* Global Background Effects */}
        <BackgroundEffects />

        {/* Global Command Palette */}
        <CommandPalette />

        {/* Global Recruiter Dock */}
        <RecruiterDock />

        {/* Global Easter Egg Manager */}
        <EasterEggManager />

        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
