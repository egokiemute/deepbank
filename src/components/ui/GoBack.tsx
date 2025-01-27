'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBack() {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }
  return (
    <div
      onClick={goBack}
      className="flex w-fit cursor-pointer items-center gap-2 text-paragraph-md font-medium text-text-weak"
    >
      <ArrowLeft size={14} />
      <span className="underline underline-offset-2">Back</span>
    </div>
  )
}
