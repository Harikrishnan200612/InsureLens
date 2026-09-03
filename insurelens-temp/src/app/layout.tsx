import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InsureLens – AI-Powered Financial Clarity for Health Insurance",
  description: "Upload your insurance policy and hospital documents to understand potential coverage, patient responsibility, and the reasons behind claim deductions.",
  keywords: "health insurance, claim analysis, insurance coverage, medical bills, AI insurance",
  openGraph: {
    title: "InsureLens – AI-Powered Financial Clarity for Health Insurance",
    description: "Understand your insurance. Know your financial responsibility.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "InsureLens – AI-Powered Financial Clarity for Health Insurance",
    description: "Understand your insurance. Know your financial responsibility.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
