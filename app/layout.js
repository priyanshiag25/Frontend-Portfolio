import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Priyanshi Agarwal | Frontend Developer",
  description:
    "Portfolio of Priyanshi Agarwal, Frontend Developer with 4.9 years of experience in React, React Native, TypeScript, and performance-focused UI engineering.",
  openGraph: {
    title: "Priyanshi Agarwal | Frontend Developer",
    description:
      "Frontend and React Native engineer focused on performant, polished product interfaces.",
    url: siteUrl,
    siteName: "Priyanshi Portfolio",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
