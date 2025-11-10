# POS
## Set Up
### Instalasi Prisma 
```bash 
    npm install @prisma/client
    npm install -D prisma

    npx prisma init
    
```

### Migrasi Data Base 

**Jalankan Migrasi buat DB saat Dev** 
buat schema db di schema.prisma baru jalankan printah di bawah. 
```bash 
    npx prisma migrate dev --name init --env-file .env.dev
```
**Jalankan Migrasi buat DB saat Prod**
```bash 
    npx prisma migrate deploy --env-file .env.prod

```

Next steps:
1. Install `dotenv`, and add `import "dotenv/config";` to your `prisma.config.ts` file to load environment variables from `.env`.
2. Run prisma dev to start a local Prisma Postgres server.
3. Define models in the schema.prisma file.
4. Run prisma migrate dev to migrate your local Prisma Postgres database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

| Perintah                    | Untuk apa                                              | Aman di Production?        |
| --------------------------- | ------------------------------------------------------ | -------------------------- |
| `npx prisma migrate dev`    | Membuat & menjalankan migrasi baru (auto-generate SQL) | ❌ **Jangan di production** |
| `npx prisma migrate deploy` | Menjalankan migrasi yang sudah ada                     | ✅ **Aman di production**   |
