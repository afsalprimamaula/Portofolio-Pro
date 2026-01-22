const express = require('express');
const cors = require('cors');
const { Resend } = require('resend'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Inisialisasi Resend dengan API Key dari .env
const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/', (req, res) => {
  res.send('Server Portfolio Afsal sudah aktif!');
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 2. Kirim Email dan tangkap objek data serta error-nya secara terpisah
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'afsalprimamaulaaa@gmail.com', 
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h3 style="color: #0F172A;">New Message Details</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <hr />
          <p><b>Message:</b></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    // 3. Cek apakah ada error dari sisi API Resend
    if (error) {
      console.error("Resend API Error Detail:", error);
      return res.status(400).json({ success: false, message: "Resend API Error", error });
    }

    // 4. Jika berhasil, log ID pengirimannya
    console.log("Email sent successfully, ID:", data.id);
    res.status(200).json({ success: true, message: "Email Sent Successfully!" });

  } catch (error) {
    // Menangkap error koneksi atau server internal
    console.error("Server Catch Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));