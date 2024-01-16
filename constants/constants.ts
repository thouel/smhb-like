export const MOTDEPASSE_LONGUEUR_MINIMALE = 5
export const MOTDEPASSE_GENERER_LONGUEUR = 12

export const formatDateAndTime: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  'fr-FR',
  {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  },
)

export const formatDateOnly: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  'en-EN',
  {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
)

export const formatPriceInEuros: Intl.NumberFormat = new Intl.NumberFormat(
  'fr-FR',
  { style: 'currency', currency: 'EUR' },
)

export const TAILLES: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const TYPES: string[] = ['Entrainement', 'Sortie', 'Accessoires']
