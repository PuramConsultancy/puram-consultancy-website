import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-20 py-4">{children}</main>
      <Footer />
    </div>
  );
}
