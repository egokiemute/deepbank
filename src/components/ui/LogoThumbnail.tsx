import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface LogoProps {
  type: 'black' | 'white'
}

const LogoThumbnail: FC<LogoProps> = ({ type }) => {
  return (
    <Link href="/" className="">
      <div className="h-[32px]">
        <Image
          src={
            type === 'black'
              ? '/images/logo-thumbnail.svg'
              : '/images/logo-white.svg'
          }
          height={200}
          width={200}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  )
}

export default LogoThumbnail
