import "./globals.css";

export const metadata = {
  title: "TubeFlow AI — YouTube kontent studiyasi",
  description: "AI yordamida YouTube mavzulari, ssenariylari va kontent rejalari yarating."
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
