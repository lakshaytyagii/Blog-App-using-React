import {React,useId,forwardRef} from 'react'

const Select=forwardRef(
  function Select({
    options,
    label,
    className='',
    ...props
},ref) {
  const id=useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}className=''>{label}</label>}
        <select
          {...prop}
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}

        >
            {/* if options has value only then it will be mapped */}
            {options?.map((option)=>{
                <option key={option} value={option}>
                    {option}

                </option>
            })}
        </select>
        </div>
  )
})
// unlike input we use a different forward ref syntax
export default Select