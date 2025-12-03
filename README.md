# POS
## Kafe Shop POS 
Kafe Shop POS adalah sistem Point of Sale yang dirancang untuk membantu operasional kafe secara digital dan terstruktur. Sistem ini menyediakan berbagai fitur utama yang mendukung proses transaksi, pengelolaan stok, pencatatan kasir, serta manajemen pengguna dan akses. Dengan sistem ini, pemilik maupun staf kafe dapat bekerja lebih efisien, mengurangi kesalahan manual, dan meningkatkan akurasi data operasional.
1. Fitur Payment (Pembayaran)

Sistem mendukung proses pembayaran yang cepat dan akurat.

Kasir dapat membuat order terlebih dahulu.

Order dapat diberi status seperti pending, unpaid, dan paid.

Saat customer membayar, sistem akan mencatat:

metode pembayaran (cash/QR/other),

jumlah uang yang dibayar,

waktu pembayaran,

status pembayaran (berhasil/gagal).

Terdapat validasi otomatis jika uang yang diterima kurang dari total order.

Fitur ini memastikan transaksi tercatat rapi dan memudahkan rekonsiliasi harian.

2. Fitur Stock (Inventori Bahan Baku & Produk)

Sistem memiliki modul untuk memantau ketersediaan bahan baku dan produk.

Stok otomatis berkurang saat ada transaksi.

Produk dapat memiliki recipe (bahan pembuat), sehingga stok bahan baku juga otomatis terpotong.

Jika bahan baku habis, sistem memberikan notifikasi atau menolak pembuatan order.

Admin dapat melakukan adjustment stok seperti penambahan, pengurangan, dan koreksi stok.

Fitur ini membantu kafe menjaga ketersediaan bahan dan mencegah kehabisan stok.

3. Fitur Kasir (Point of Sale)

Modul kasir menjadi fitur utama dalam sistem.

Kasir dapat memilih produk, variant (jika ada), dan jumlah.

Sistem menghitung subtotal, diskon, pajak, dan total otomatis.

Kasir dapat membuka dan menutup shift.

Sistem mencatat semua transaksi yang dilakukan kasir termasuk pendapatan harian.

Dengan modul ini, proses transaksi menjadi cepat dan minim kesalahan.

4. Fitur User & Role Management

Sistem mendukung pengaturan pengguna yang berbeda sesuai tugas dan tanggung jawab.

Role (peran) dapat berupa admin, kasir, owner, atau staff dapur.

Setiap role memiliki hak akses yang berbeda, misalnya:

Admin: kelola user, stok, laporan.

Kasir: mencatat order & payment.

Owner: melihat laporan dan mengelola bisnis.

User login dengan akun masing-masing sehingga data lebih aman dan terkontrol.

Dengan manajemen role, sistem lebih aman dan tertata.

5. Pencatatan Kasir (Cashier Log / Shift Report)

Setiap kasir memiliki pencatatan aktivitas saat bekerja.

Kasir dapat melakukan open shift dengan saldo awal.

Selama shift, sistem mencatat jumlah transaksi, total pendapatan, dan metode pembayaran.

Kasir melakukan closing shift dan sistem menghitung selisih antara saldo sistem dan saldo kasir.

Data shift tersimpan sebagai laporan harian.

Fitur ini memudahkan audit keuangan dan mengurangi risiko kehilangan uang.

## Kesimpulan

Kafe Shop POS adalah solusi lengkap untuk manajemen operasional kafe, mulai dari transaksi, inventori, hingga pengaturan pengguna dan shift kasir. Sistem ini dirancang untuk memudahkan pekerjaan staf dan memberikan laporan bisnis yang rapi kepada pemilik kafe.

## Set Up
### Instalasi Prisma 
```bash 
    npm install @prisma/client
    npm install -D prisma

    npx prisma init
    
```
### Barang yang di perlukan  
```bash 
    npm install dotenv
    npm install --save-dev tsx #pake tsx buat ngejalanin app biar aman gak ribet anjay 
```

### Migrasi Data Base 
1. Jalankan Perintah ini di terminal
**Jalankan Generate prisma**
```bash 
    npx env-cmd -f ./config/.env.dev npx prisma generate
```
**Jalankan Migrasi buat DB saat Dev** 
```bash 
    npx  env-cmd -f ./config/.env.dev npx prisma migrate dev 
```
**Jalankan Migrasi buat DB saat Prod**
```bash 
    npx dotenv -e ./config/.env.prod -- npx prisma migrate deploy
```
2. Atau bisa juga menjalankan printah ini juga 
```bash 
    npm run prisma:generate:dev
    npm run prisma:migrate:dev
```
ini sudah tak di package.json, jadi gak perlu panjang panjang buatnya

### Jalankan App 
```bash 
    npx env-cmd -f ./config/.env.dev npx tsx watch src/app.ts
```
bisa juga begini ```bash npm run dev ``` ini karena saya sudah buatkan di package json.



### Structure Folder 
```bash 
 |pos-api-ts
 ├── app.ts
 ├── config/
 │     ├── .env.dev
 │     ├── .env.prod
 │     └── prisma.config.ts
 │
 ├── core/
 │     ├── halper/
 │     │     ├── HttpStatus.ts
 │     │     ├── BaseController.ts
 │     │     └── ErrorHandler.ts
 │     │
 │     ├── request/
 │     │     └── RequestType.ts
 │     │
 │     └── respond/
 │           ├── ResponseHandler.ts
 │           └── ResponseType.ts
 │
 ├── controller/
 │     └── user.controller.ts
 │
 ├── routes/
 │     └── user.routes.ts
 │
 ├── models/
 │     └── user.model.ts
 │
 └── prisma/
       └── schema.prisma

```
### Penjelasan 
| Folder       | Fungsinya        | Analogi             |
| ------------ | ---------------- | ------------------- |
| `config`     | pengaturan       | Wi-Fi & kunci toko  |
| `core`       | alat bantu utama | toolbox             |
| `controller` | logika utama     | pegawai toko        |
| `routes`     | peta toko        | denah ruangan       |
| `models`     | bentuk data      | buku catatan barang |
| `prisma`     | database         | gudang penyimpanan  |
| `app.ts`     | main gate        | pintu utama toko    |


## Kalo ada error prismanya 
jalanin ini aja 
```bash 
    rmdir /s /q node_modules
    rmdir /s /q prisma\generated
    npm install
    npx prisma generate 
```

## Oprator pada prisma 
```bash 
    | **Method**   | **Fungsi**         | **Penjelasan**                           | **Contoh**             |
| ------------ | ------------------ | ---------------------------------------- | ---------------------- |
| `add()`      | Penjumlahan        | Menambah dua Decimal                     | `a.add(b)`             |
| `sub()`      | Pengurangan        | Mengurangi nilai Decimal                 | `a.sub(b)`             |
| `mul()`      | Perkalian          | Mengalikan dua Decimal                   | `price.mul(qty)`       |
| `div()`      | Pembagian          | Membagi satu Decimal dengan Decimal lain | `total.div(2)`         |
| `neg()`      | Negatif            | Mengubah angka menjadi minus             | `used.neg()` → `-used` |
| `abs()`      | Absolut            | Mengubah nilai ke bilangan positif       | `(-5).abs()` → `5`     |
| `toNumber()` | Convert ke number  | Mengubah Decimal ke `number` JS          | `price.toNumber()`     |
| `toString()` | Convert ke string  | Mengubah Decimal ke string               | `price.toString()`     |
| `equals()`   | Bandingkan angka   | Cek apakah dua Decimal sama              | `a.equals(b)`          |
| `cmp()`      | Compare            | Membandingkan (<, =, >)                  | `a.cmp(b)` → -1,0,1    |
| `isZero()`   | Cek nol            | True jika nilai 0                        | `a.isZero()`           |
| `floor()`    | Pembulatan kebawah | Sama seperti Math.floor                  | `a.floor()`            |
| `ceil()`     | Pembulatan ke atas | Sama seperti Math.ceil                   | `a.ceil()`             |
| `pow()`      | Pangkat            | Math.pow untuk Decimal                   | `a.pow(2)`             |

```