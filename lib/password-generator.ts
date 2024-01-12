import { MOTDEPASSE_GENERER_LONGUEUR } from '@/constants/constants'

const lowerCasedAlphabets = [...'abcdefghijklmnopqrstuvwxyz'.split('')]
const upperCasedAlphabets = lowerCasedAlphabets.map((alphabet) =>
  alphabet.toUpperCase(),
)
const numbers = [...'1234567890'.split('').map((num) => +num)]
const symbols = [...'!"#$%&\'()*+,-./:;<=>?@[]_{|}'.split('')]

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

/**
 * Generate a random password of length 40 consisting of lowercase letters,uppercase letters,numbers and symbols
 * @returns string
 */
export const getRandomPassword = (): string => {
  const randompassword: (string | number)[] = []
  const params = [
    ...lowerCasedAlphabets,
    ...upperCasedAlphabets,
    ...numbers,
    ...symbols,
  ]
  while (randompassword.length < MOTDEPASSE_GENERER_LONGUEUR) {
    const randomInt = getRandomNumber(params.length)
    randompassword.push(params[randomInt])
  }

  return randompassword.join('')
}
