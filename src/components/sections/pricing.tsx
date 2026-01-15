import { PricingCard } from "@/components/ui/pricing-card";
import { getPackages } from "@/actions/pricing-actions"; // Ajanımız

export async function Pricing() {
  // 1. Veritabanından verileri çek
  const { data: dbPackages } = await getPackages();

  // 2. Eğer veritabanı boşsa bu varsayılanları göster (İlk izlenim için)
  const defaultPackages = [
    {
      id: "demo1",
      title: "Tanışma Paketi",
      description: "Patenle ilk kez tanışanlar için özel ders.",
      price: 750,
      unit: "/ Ders",
      features: ["45 Dakika Eğitim", "Ekipman Tanıtımı", "Denge Çalışması", "Düşüş Teknikleri"],
      isPopular: false,
      buttonText: "Randevu Al"
    },
    {
      id: "demo2",
      title: "Hızlandırılmış Kurs",
      description: "Kısa sürede şehre karışmak isteyenler için.",
      price: 3500,
      unit: "/ 5 Ders",
      features: ["5 x 1 Saat Ders", "Video Analizi", "Şehir Turu", "Koruma Ekipmanı Desteği"],
      isPopular: true,
      buttonText: "Paketi Seç"
    },
    {
      id: "demo3",
      title: "Pro Teknik",
      description: "İleri seviye teknikler ve slalom eğitimi.",
      price: 900,
      unit: "/ Ders",
      features: ["Geri Sürüş Teknikleri", "Slalom Giriş", "Ani Frenleme", "Zıplama & Akrobasi"],
      isPopular: false,
      buttonText: "İncele"
    }
  ];

  // Veritabanında veri varsa onu kullan, yoksa varsayılanları
  const packages = (dbPackages && dbPackages.length > 0) ? dbPackages : defaultPackages;

  return (
    <section id="courses" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Ders Paketleri
          </h2>
          <p className="text-gray-500 text-lg">
            İster hobi amaçlı, ister profesyonel. Sana en uygun paketi seç ve paten sürmenin özgürlüğünü keşfet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {packages.map((pkg: any, index: number) => (
            <PricingCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}