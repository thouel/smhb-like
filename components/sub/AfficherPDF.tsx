'use client'

import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '../ui/button'
import { GrNext, GrPrevious } from 'react-icons/gr'

type Props = { fichier: string }

const AfficherPDF = (props: Props) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const { fichier } = props
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  const previousPage = () => {
    changePage(-1)
  }

  const nextPage = () => {
    changePage(1)
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <Document
          file={fichier}
          onLoadSuccess={onDocumentLoadSuccess}
          className='self-center'
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <div className='flex flex-row gap-5 grow'>
          <Button
            variant='secondary'
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className='grow'
          >
            <GrPrevious className='w-8 h-8' />
          </Button>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
          </p>
          <Button
            variant='secondary'
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className='grow'
          >
            <GrNext className='w-8 h-8' />
          </Button>
        </div>
      </div>
    </>
  )
}

export default AfficherPDF
