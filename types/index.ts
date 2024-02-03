import { Prisma } from '@prisma/client'

export type ArticleReferenceWithIllustrations =
  Prisma.ArticleReferenceGetPayload<{
    include: { illustrations: true }
  }> | null

export type ArticleVariantWithStock = Prisma.ArticleVariantGetPayload<{
  include: { stock: true }
}> | null

export type ArticleVariantWithStockAndRef = Prisma.ArticleVariantGetPayload<{
  include: { stock: true; reference: true }
}> | null

export type ArticleReferenceWithVariants = Prisma.ArticleReferenceGetPayload<{
  include: { variants: { include: { stock: true } } }
}> | null

export type ArticleReferenceWithVariantsAndIllustrations =
  Prisma.ArticleReferenceGetPayload<{
    include: { variants: { include: { stock: true } }; illustrations: true }
  }> | null

export type ArticleReferenceWithFullTree = Prisma.ArticleReferenceGetPayload<{
  include: {
    variants: { include: { stock: true; reference: true } }
    illustrations: true
  }
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

export enum REFERENCE_STATUS {
  DRAFT,
  ACTIVE,
  INACTIVE,
}

export function getReferenceStatus(value: number): string {
  return value === 2 ? 'Inactive' : value === 1 ? 'Active' : 'Brouillon'
}
