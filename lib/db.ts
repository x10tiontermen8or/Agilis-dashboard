// 📂 lib/db.ts

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

// This line checks if we are on the server before trying to use `process`
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}