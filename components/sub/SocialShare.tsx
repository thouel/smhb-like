'use client'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { TbBrandWhatsapp } from 'react-icons/tb'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

const SocialShare = () => {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.href)
    }
  }, [])

  return (
    <div className='flex flex-row justify-between w-full gap-5'>
      {typeof window !== undefined && (
        <>
          <FacebookShareButton url={url}>
            <div className='flex flex-row items-center gap-2 align-middle bg-yellow-500 rounded-lg'>
              <span className='p-1 ml-2 bg-white border-2 border-white rounded-full '>
                <FacebookIcon className='w-6 h-6 text-yellow-500' />
              </span>
              <span className='p-3 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg hover:text-white hover:bg-yellow-500'>
                Facebook
              </span>
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <div className='flex flex-row items-center gap-2 align-middle bg-yellow-500 rounded-lg'>
              <span className='p-1 ml-2 bg-white border-2 border-white rounded-full'>
                <TwitterIcon className='w-6 h-6 text-yellow-500 ' />
              </span>
              <span className='p-3 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg hover:text-white hover:bg-yellow-500'>
                Twitter
              </span>
            </div>
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <div className='flex flex-row items-center gap-2 align-middle bg-yellow-500 rounded-lg'>
              <span className='p-1 ml-2 bg-white border-2 border-white rounded-full'>
                <TbBrandWhatsapp className='w-6 h-6 text-yellow-500 ' />
              </span>
              <span className='p-3 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg hover:text-white hover:bg-yellow-500'>
                WhatsApp
              </span>
            </div>
          </WhatsappShareButton>
          <LinkedinShareButton url={url}>
            <div className='flex flex-row items-center gap-2 align-middle bg-yellow-500 rounded-lg'>
              <span className='p-1 ml-2 bg-white border-2 border-white rounded-full'>
                <LinkedinIcon className='w-6 h-6 text-yellow-500 ' />
              </span>
              <span className='p-3 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg hover:text-white hover:bg-yellow-500'>
                LinkedIn
              </span>
            </div>
          </LinkedinShareButton>
        </>
      )}
    </div>
  )
}

export default SocialShare
