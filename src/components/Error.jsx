import React from 'react'

const Error = ({children}) => {
  return (
    
        <div className="bg-red-600 text-center rounded-xl font-bold text-white uppercase mb-3 p-3">
          {children}
        </div>
      
  )
}

export default Error