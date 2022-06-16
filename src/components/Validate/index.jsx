import React from 'react'
import "./Validate.scss"

const Validate = ({field, error}) => {
  return (
    <div className='validate'>
        {error?`${field} ${error}`: null}
    </div>
  )
}

export default Validate