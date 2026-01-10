import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white gap-6">
      <h1 className="text-4xl font-bold">SkatePro Yayında! 🚀</h1>
      <p className="text-slate-400">Şu an anasayfadasın. Admin paneline gitmek için tıkla:</p>
      
      <Link href="/admin">
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
          Admin Paneline Git
        </Button>
      </Link>
    </div>
  );
}