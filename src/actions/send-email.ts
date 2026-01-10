"use server";

import nodemailer from "nodemailer";

export async function sendEmail(prevState: any, formData: FormData) {
  // Verileri al
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string; // EKLENDİ
  const course = formData.get("course") as string; // EKLENDİ
  const message = formData.get("message") as string;

  // Validasyon (Telefon ve Ders seçimi zorunlu olsun mu? Bence olsun.)
  if (!name || !email || !message || !phone || !course) {
    return { success: false, message: "Lütfen tüm alanları doldurun." };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"weCAN İletişim" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Yeni Öğrenci: ${name} ${surname} (${course})`, // Konuya dersi de ekledim
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4F46E5;">Yeni Bir Talep Var! 🛹</h2>
          
          <table style="width: 100%; text-align: left; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Ad Soyad:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${name} ${surname}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>E-Posta:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>İlgilendiği Ders:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: #d97706; font-weight: bold;">${course}</td>
            </tr>
          </table>
          
          <br />
          <p><strong>Mesaj:</strong></p>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mesajınız başarıyla gönderildi!" };
  } catch (error) {
    console.error("Mail hatası:", error);
    return { success: false, message: "Bir hata oluştu, lütfen tekrar deneyin." };
  }
}