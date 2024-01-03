'use client'

import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

type Props = { fichier: string; width: number }

const AfficherPremierePagePDF = (props: Props) => {
  const { fichier, width } = props
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()

  return (
    <>
      <Document file={fichier}>
        <Page
          pageNumber={1}
          width={width}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </>
  )
}

export default AfficherPremierePagePDF
