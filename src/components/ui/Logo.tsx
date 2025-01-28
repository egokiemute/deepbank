import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface LogoProps {
  type: 'black' | 'white'
}

const Logo: FC<LogoProps> = ({ type }) => {
  return (
    <Link href="/" className="h-full max-h-[30px]">
      <div className="h-[22px] min-w-[100px] md:h-full">
        <Image
          src={
            type === 'black'
              ? '/images/logo-black.webp'
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

export default Logo
