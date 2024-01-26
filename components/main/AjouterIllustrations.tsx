'use client'

import type { ArticleWithIllustrations } from '@/types'
import { useFormStatus } from 'react-dom'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { HiXMark } from 'react-icons/hi2'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { ajouterIllustrations } from '@/actions/ajouterIllustrations'
import {
  baseStyle,
  rejectStyle,
  focusedStyle,
  acceptStyle,
} from './EditerIllustrations.types'

type Props = {
  article?: ArticleWithIllustrations
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const AjouterIllustrations = (props: Props) => {
  const { article } = props
  const illustrations = article?.illustrations
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const { pending } = useFormStatus()

  /**
   * DropZone configuration
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length && acceptedFiles.length + files.length <= 3) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ])
      }
    },
    [files.length],
  )
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000,
    multiple: true,
    maxFiles: 3,
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  /**
   * End of DropZone Configuration
   */

  useEffect(() => {
    return () => {
      files.forEach((f) => {
        URL.revokeObjectURL(f.preview)
      })
    }
  }, [files])

  const removeFile = (name: string) =>
    setFiles(files.filter((f) => f.name !== name))

  const removeAllFiles = () => {
    setFiles([])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const fd = new FormData()

    files.forEach(async (f) => {
      fd.append(`newImages`, f as File)
    })
    if (article) {
      fd.append('idArticle', article.id)
    }

    const data = await ajouterIllustrations(fd)

    removeAllFiles()
  }

  return (
    <>
      <h1 className='text-xl font-semibold'>Nouvelles</h1>
      <form onSubmit={handleSubmit}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>{'Déposez vos fichiers ici'}</p>
          ) : (
            <p className='flex flex-col'>
              <span>
                {
                  'Glissez-déposez les illustrations ici, ou cliquez pour ouvrir le menu'
                }
              </span>
              <span className='text-sm'>
                {'Seules les images sont autorisées'}
              </span>
            </p>
          )}
        </div>
        <div>
          <ul className='grid grid-cols-2 gap-10 mt-5 md:grid-cols-3 xl:grid-cols-4'>
            {files.map((f) => (
              <li key={f.name} className='relative rounded-md shadow-lg h-52'>
                <Image
                  src={f.preview}
                  alt={f.name}
                  width={100}
                  height={100}
                  onLoad={() => URL.revokeObjectURL(f.preview)}
                  className='object-cover w-full h-full rounded-md'
                />
                <button
                  type='button'
                  className='absolute flex items-center justify-center transition-colors bg-red-600 border border-red-600 rounded-full w-7 h-7 -top-3 -right-3 hover:bg-white'
                  onClick={() => removeFile(f.name)}
                >
                  <HiXMark className='w-6 h-6 text-center text-white hover:fill-red-600' />
                </button>
              </li>
            ))}
          </ul>
          <Separator />
          <div className='flex flex-row justify-end gap-5 mt-5'>
            <Button
              variant='ghost'
              disabled={files.length > 0 ? false : true}
              onClick={() => removeAllFiles()}
            >
              Réinitialiser
            </Button>
            <Button variant='default' type='submit' aria-disabled={pending}>
              {'Mettre à jour les illustrations'}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AjouterIllustrations
