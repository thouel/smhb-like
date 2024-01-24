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
import { log } from '@logtail/next'
import Image from 'next/image'
import { HiXMark } from 'react-icons/hi2'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { editerIllustrations } from '@/actions/editerIllustrations'

type Props = {
  article?: ArticleWithIllustrations
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const baseStyle = {
  textAlign: 'center' as const,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const EditerIllustrations = (props: Props) => {
  const { article } = props
  const illustrations = article?.illustrations
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const { pending } = useFormStatus()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ])
    }
  }, [])
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
    maxFiles: 8,
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

    files.forEach((f) => {
      fd.append(`newImages`, f as File)
    })
    if (article) {
      fd.append('idArticle', article.id)
    }

    const data = await editerIllustrations(fd)
  }

  return (
    <>
      <div className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow'>
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
            <ul className='grid grid-cols-2 gap-10 mt-5 mb-16 md:grid-cols-3 xl:grid-cols-4'>
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
                  <p className='mt-2 text-xs font-medium break-words text-neutral-500 line-clamp-3'>
                    {f.name}
                  </p>
                </li>
              ))}
            </ul>
            <Separator />
            <div className='flex flex-row justify-end gap-5 my-5'>
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
      </div>
    </>
  )
}

export default EditerIllustrations
