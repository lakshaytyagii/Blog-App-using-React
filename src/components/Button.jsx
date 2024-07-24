import React from 'react'

function Button({
    // al these are default properties passed which can be changed
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    // last props spread is used to add all props like onCLick and Disabled
    ...props


}) {
  return (
    // this children will only transfer text into it
    // all those properties (paramters) above can be inserted here
    // if any other properties are also given by the user then they an 
    // also be added by using {...props} like OnClick and Disabled which are defiend outside of className
    <button
    className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
    {...props}

    >{children}</button>
  )
}

export default Button