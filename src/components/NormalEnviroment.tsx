import React from 'react'

const NormalEnviroment = () => {
  return (
    <div className="w-64 bg-gray-100 rounded-md p-4 shadow-sm">
    {/* Environment Status Header */}
    <div className="bg-gray-500 text-white text-center py-2 rounded-md mb-3 font-medium text-sm">
      NORMAL ENVIRONMENT
    </div>
    
    {/* Status Message */}
    <div className="text-gray-600 text-sm text-left">
      All good, both sensors are showing the joints in healthy status. damnm damn
    </div>
  </div>
  )
}

export default NormalEnviroment