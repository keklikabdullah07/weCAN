// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs') // Şifreleme için ekledik

const prisma = new PrismaClient()

async function main() {
  // 1. Mevcut verileri temizle (İstersen bu satırları silebilirsin, veriler gitmesin)
  // await prisma.pricingPackage.deleteMany() 
  // await prisma.adminUser.deleteMany() // Önce eski adminleri sil

  // 2. Admin Kullanıcısı Oluştur
  const hashedPassword = await bcrypt.hash("123456", 10) // Şifre: 123456

  await prisma.adminUser.upsert({
    where: { email: 'admin@weCAN.com' },
    update: {},
    create: {
      email: 'admin@weCAN.com',
      password: hashedPassword,
    },
  })

  console.log("✅ Admin kullanıcısı (admin@weCAN.com) oluşturuldu!")
  
  // Paketler zaten varsa tekrar ekleme yapmıyoruz...
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })