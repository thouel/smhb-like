import { ArticleVariantWithStockAndRef } from '@/types'
import { log } from '@logtail/next'
import { create } from 'zustand'

type CartItem = { quantite: number } & ArticleVariantWithStockAndRef

type CartStore = {
  cart: CartItem[]
  count: () => number
  add: (article: ArticleVariantWithStockAndRef) => void
  setQuantity: (
    article: ArticleVariantWithStockAndRef,
    quantite: string,
  ) => void
  remove: (variantId: string) => void
  removeAll: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  count: () => {
    const { cart } = get()
    if (cart.length) {
      return cart
        .map((item) => item.quantite)
        .reduce((prev, curr) => prev + curr)
    }
    return 0
  },
  add: (article: ArticleVariantWithStockAndRef) => {
    const { cart } = get()
    const updatedCart = updateCart(article, cart)
    set({ cart: updatedCart })
  },
  remove: (variantId: string) => {
    const { cart } = get()
    const updatedCart = removeCart(variantId, cart)
    set({ cart: updatedCart })
  },
  removeAll: () => set({ cart: [] }),
  setQuantity: (
    article: ArticleVariantWithStockAndRef,
    newQuantity: string,
  ) => {
    const { cart } = get()
    const updatedCart = setQuantity(article, newQuantity, cart)
    set({ cart: updatedCart })
  },
}))

const setQuantity = (
  article: ArticleVariantWithStockAndRef,
  newQuantity: string,
  cart: CartItem[],
): CartItem[] => {
  const quantity = Number.parseInt(newQuantity)
  if (!article || !quantity) {
    return cart
  }
  const articleOnCart = cart.map((item) => item.id).includes(article.id)
  if (!articleOnCart) {
    return cart
  }
  return cart.map((item) => {
    if (item.id === article.id) {
      return { ...item, quantite: quantity } as CartItem
    }
    return item
  })
}

const updateCart = (
  article: ArticleVariantWithStockAndRef,
  cart: CartItem[],
): CartItem[] => {
  if (!article) {
    return cart
  }
  const cartItem = { ...article, quantite: 1 } as CartItem
  const articleOnCart = cart.map((item) => item.id).includes(article.id)

  if (!articleOnCart) {
    cart.push(cartItem)
  } else {
    return cart.map((item) => {
      if (item.id === article.id) {
        return { ...item, quantite: item.quantite + 1 } as CartItem
      }
      return item
    })
  }
  return cart
}

const removeCart = (variantId: string, cart: CartItem[]): CartItem[] => {
  return cart
    .map((item) => {
      if (item.id === variantId) {
        return { ...item, quantite: item.quantite - 1 }
      }
      return item
    })
    .filter((item) => {
      return item.quantite
    })
}
