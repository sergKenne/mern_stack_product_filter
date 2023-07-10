import React from 'react'
import loading from '../loader.gif'
const Loading = () => {
  return (
    <div className='loading'>
      <img src={loading} alt="Loading..." />
    </div>
  )
}

export default Loading