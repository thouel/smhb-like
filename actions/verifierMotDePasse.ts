'use server'

import { MOTDEPASSE_LONGUEUR_MINIMALE } from '@/constants/constants'

export type Verifications = {
  uneLettreMinuscule: boolean
  uneLettreMajuscule: boolean
  unChiffre: boolean
  unCaractereSpecial: boolean
  auMoinsXCaracteresDeLong: boolean
}

export type VerifierMotDePasse = {
  nbOk: number
  nbTotal: number
  longueurMinimale: number
  verifications: Verifications
}

export async function verifierMotDePasse(
  motDePasse: string,
): Promise<VerifierMotDePasse> {
  // has one lowercase letter
  // has one uppercase letter
  // has one digit
  // has one special character
  // has no forbidden character
  // is at least 5 long

  const checks: Verifications = {
    uneLettreMinuscule: false,
    uneLettreMajuscule: false,
    unChiffre: false,
    unCaractereSpecial: false,
    auMoinsXCaracteresDeLong: false,
  }
  const NB_CHECKS = Object.values(checks).length

  checks.uneLettreMinuscule = /[a-z]/.test(motDePasse)
  checks.uneLettreMajuscule = /[A-Z]/.test(motDePasse)
  checks.unChiffre = /[0-9]/.test(motDePasse)
  checks.unCaractereSpecial = /[,\;:!§\.\?µ%\*ù$=\)àç_è\-('"é&\]}@\|\[{#]/.test(
    motDePasse,
  )
  checks.auMoinsXCaracteresDeLong =
    motDePasse.length >= MOTDEPASSE_LONGUEUR_MINIMALE

  const passedChecks = Object.values(checks).filter((value) => value)
  return {
    nbOk: passedChecks.length,
    nbTotal: NB_CHECKS,
    longueurMinimale: MOTDEPASSE_LONGUEUR_MINIMALE,
    verifications: checks,
  }
}
