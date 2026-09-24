import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bickri AI Studio",
  description: "Studio IA professionnel pour créer, organiser et publier du contenu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
