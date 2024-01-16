import { Prisma } from '@prisma/client'

export type ArticleWithStockAndIllustrations = Prisma.ArticleGetPayload<{
  include: { stock: true; illustrations: true }
}> | null

export type ArticleWithStock = Prisma.ArticleGetPayload<{
  include: { stock: true }
}> | null

export type ArticleWithIllustrations = Prisma.ArticleGetPayload<{
  include: { illustrations: true }
}> | null
