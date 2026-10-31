# Web Donasi Publik & Portal Akun Donatur — Panti Asuhan As-Sholihin

Branch **`web-donasi`** berisi kode sumber aplikasi **Web Donasi Publik & Portal Akun Donatur** untuk **Yayasan Assholihin Candimulyo Jombang (LKSA Panti Asuhan As-Sholihin)** yang siap di-deploy langsung ke **Vercel**.

## Fitur Utama
- **Layanan Donasi Instan**: Pilihan program (*Beasiswa SPP, Pangan & Gizi, Pemeliharaan Asrama, Santunan Yatim, Zakat/Infaq*) dengan preset nominal cepat.
- **Checkout Multi-Kanal & QRIS Resmi**: Mendukung pembayaran Virtual Account, E-Wallet, dan QRIS Standar Nasional (`NMID: ID1026507480998`).
- **Portal Akun Donatur (`/portal-donatur`)**:
  - Kelola Data Profil & Identitas (Nama KTP & Nama Alias Publik).
  - Kelola Nomor Rekening Bank Tersimpan (untuk autodebit Kafalah & rekening tujuan *refund*).
  - Pengaturan Web & Privasi (*Mode Hamba Allah Default*, notifikasi E-Kwitansi WhatsApp, langganan E-LPJ bulanan).
  - Tabel Riwayat Donasi & Unduh E-Kwitansi PDF.
- **Portal Transparansi Kas (PSAK 109)**: Grafik arus kas masuk vs pengeluaran operasional panti dan daftar donatur terverifikasi real-time.
- **Kepatuhan Payment Gateway**: Dilengkapi dokumen kebijakan *Syarat & Ketentuan*, *Kebijakan Privasi (UU PDP)*, dan *Kebijakan Pengembalian Dana (Refund Policy)*.

## Menjalankan Secara Lokal
```bash
npm install
npm run dev
```

## Konfigurasi Vercel
Proyek ini telah dilengkapi dengan `vercel.json` (SPA routing rewrites) dan konfigurasi build standar Vite (`npm run build` -> output `dist`).
