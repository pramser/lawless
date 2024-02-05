# lawless.gg

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# docker is used for creating the database
docker-compose up -d

# prisma allows simple database setup
npm run db:init

# npm is used to run the server
npm run dev
```

You'll need to add some data with Prisma Studio to see anything after running the server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
