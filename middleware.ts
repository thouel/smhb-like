import { log } from '@logtail/next'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    log.info('req.nextauth.token', { token: req.nextauth.token })
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 0,
    },
  },
)

export const config = { matcher: ['/admin', '/admin/(.*)'] }
