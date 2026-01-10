import { prisma } from "@/lib/prisma"; // Az önce oluşturduğumuz yardımcı
import { PricingCard } from "@/components/ui/pricing-card"; // Kart bileşeni

// "async" ekledik çünkü veritabanı işlemi yapacağız
export async function Pricing() {
  
  // 1. Veritabanından verileri çek (Fiyata göre sırala)
  const packages = await prisma.pricingPackage.findMany({
    orderBy: {
      price: 'asc', // Ucuzdan pahalıya sırala
    },
  });

  return (
    <section id="courses" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Başlık Alanı */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Ders Paketleri
          </h2>
          <p className="text-gray-500 text-lg">
            İster hobi amaçlı, ister profesyonel. Sana en uygun paketi seç ve paten sürmenin özgürlüğünü keşfet.
          </p>
        </div>

        {/* Kartlar Alanı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {packages.map((pkg, index) => (
            // Veritabanından gelen her paket için bir kart bas
            <PricingCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}