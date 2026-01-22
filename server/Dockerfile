# 1. Gunakan image Node.js resmi sebagai dasar
FROM node:18

# 2. Tentukan direktori kerja di dalam container
WORKDIR /app

# 3. Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# 4. Instal library yang dibutuhkan
RUN npm install

# 5. Salin seluruh kode dari folder server ke dalam container
COPY . .

# 6. Beritahu container bahwa aplikasi berjalan di port 5000
EXPOSE 5000

# 7. Perintah untuk menjalankan server Anda
CMD ["node", "index.js"]