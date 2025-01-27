import { Loader } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className="animate-spin">
      <Loader size={24} />
    </div>
  )
}

export default Spinner
