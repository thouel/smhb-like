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

export type MessageWithAnswer = Prisma.MessageGetPayload<{
  include: { answer: true }
}> | null

export enum MESSAGE_STATUS {
  TODO,
  WIP,
  DONE,
}

export function getMessageStatus(value: number): string {
  return value === 2 ? 'Fait' : value === 1 ? 'En cours' : 'A faire'
}

export enum MESSAGE_TYPE {
  CONTACT,
  ORDER,
}

export function getMessageType(value: number): string {
  return value === 1 ? 'Commande' : 'Demande de contact'
}
