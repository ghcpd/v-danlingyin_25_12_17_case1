import React from 'react'

interface Props {
  title?: string
  message?: string
}

export const EmptyState: React.FC<Props> = ({ title = 'Nothing here', message = 'You have no items yet.' }) => {
  return (
    <div className="p-8 bg-white rounded-md shadow text-center">
      <div className="text-2xl font-semibold">{title}</div>
      <p className="text-sm text-gray-500 mt-2">{message}</p>
    </div>
  )
}

export default EmptyState
