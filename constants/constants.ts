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
  'fr-FR',
  {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
)
