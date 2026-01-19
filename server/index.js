const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Tambahkan ini
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Konfigurasi Transporter (Jembatan ke Layanan Email)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email pengirim (Gmail Anda)
    pass: process.env.EMAIL_PASS, // App Password dari Google
  },
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // 2. Setting Konten Email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Pengirim harus email Anda agar diizinkan Gmail
    to: process.env.EMAIL_USER,   // Dikirim ke email Anda sendiri
    replyTo: email,               // Jika Anda klik 'Reply' di email, akan tertuju ke pengunjung
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
  };

  // 3. Eksekusi Pengiriman
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "Email Sent Successfully!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));