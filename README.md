# POS
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