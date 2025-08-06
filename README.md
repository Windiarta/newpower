# Company Catalog - Aplikasi Katalog Perusahaan

Aplikasi katalog perusahaan yang dibangun dengan Next.js, TypeScript, Tailwind CSS, dan Sanity CMS. Aplikasi ini mendukung bahasa Indonesia dan Inggris dengan fitur pencarian, filter, dan panel admin.

## Fitur Utama

### 🏢 Profil Perusahaan
- Informasi lengkap perusahaan (nama, deskripsi, visi, misi)
- Alamat dan kontak informasi
- Social media links
- Dukungan multi-bahasa (Indonesia & Inggris)

### 📦 Katalog Produk
- Tampilan produk dengan gambar, nama, dan deskripsi
- Kategori produk dengan filter
- Fitur pencarian produk
- Sorting berdasarkan nama, harga, dan tanggal
- Pagination untuk produk yang banyak

### 🔍 Fitur Pencarian & Filter
- Pencarian berdasarkan nama dan deskripsi produk
- Filter berdasarkan kategori
- Sorting berdasarkan harga (terendah/tertinggi)
- Sorting berdasarkan tanggal (terbaru/terlama)

### 👥 Kontak Person
- Daftar contact person dengan foto
- Informasi lengkap (nama, posisi, email, telepon, WhatsApp)
- Form kontak untuk pengunjung

### 🌐 Multi-Bahasa
- Dukungan bahasa Indonesia dan Inggris
- Switch bahasa yang mudah
- Terjemahan lengkap untuk semua konten

### 🔧 Panel Admin
- Manajemen produk (tambah, edit, hapus)
- Manajemen informasi perusahaan
- Manajemen contact person
- Interface yang user-friendly

## Teknologi yang Digunakan

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Sanity CMS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Styling**: Tailwind CSS

## Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Halaman admin
│   ├── company/           # Halaman profil perusahaan
│   ├── contact/           # Halaman kontak
│   ├── products/          # Halaman produk
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Halaman utama
├── components/            # React components
│   ├── Header.tsx         # Header dengan navigasi
│   ├── Footer.tsx         # Footer dengan kontak
│   ├── ProductCard.tsx    # Card produk
│   └── SearchAndFilter.tsx # Komponen pencarian & filter
├── lib/                   # Utilities
│   ├── sanity.ts          # Konfigurasi Sanity
│   └── i18n.ts            # Internationalization
├── locales/               # File terjemahan
│   ├── id.json            # Bahasa Indonesia
│   └── en.json            # Bahasa Inggris
└── types/                 # TypeScript types
    └── index.ts           # Interface definitions
```

## Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd company-catalog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` dengan konfigurasi berikut:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
```

### 4. Setup Sanity Studio (Opsional)
Untuk mengelola konten, Anda perlu setup Sanity Studio:

```bash
npm install -g @sanity/cli
sanity init
```

### 5. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Konfigurasi Sanity

### 1. Buat Project Sanity
- Kunjungi [sanity.io](https://sanity.io)
- Buat project baru
- Pilih dataset "production"

### 2. Setup Schema

```
npx sanity dataset import --replace --json --dataset new-power sample-data.ndjson 
```


## Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Netlify
1. Build project: `npm run build`
2. Deploy folder `out` ke Netlify

## Kontribusi

1. Fork repository
2. Buat feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push ke branch: `git push origin feature/amazing-feature`
5. Buat Pull Request

## License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Support

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.
