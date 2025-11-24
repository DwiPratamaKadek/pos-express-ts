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
    rm -rf node_modules
    rm -rf prisma/generated
    npm install
    generate schema ulang 
    
```