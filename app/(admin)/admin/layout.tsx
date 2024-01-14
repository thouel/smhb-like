import FilArianeAdministration from '@/components/sub/FilArianeAdministration'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: {
    template: '%s | Administration SMHB',
    default: 'Administration',
  },
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FilArianeAdministration />
      {children}
    </div>
  )
}

export default AdminLayout
