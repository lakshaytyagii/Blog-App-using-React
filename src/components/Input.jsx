import React,{useId} from 'react'

// just like button this component is made for mass usage
// thus we pre define default values of some properties
// annd also let possibility of overwriting existing non-mentioned props like onChange

// here we have used .forwardref because we cant give useState values in mass used components
const Input=React.forwardRef(
    
    function Input(
        {
            label,
            type='text',
            className='',
            ...props
        },ref
    ){
        const id=useId();
        return (
            <div
            className='w-full'>
                {/* is label is passed on in the parameter */}
                {label && <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                    >{label}</label>}
                <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                // ref is inputed and it is then inserted here which helps use to take refrence from parents
                // and then we access to chnge useState deefined before
                // here id is used to link in with hrmlfor by using the same id
                ref={ref}
                {...props}
                id={id}
                />

                   

            </div>
        )
    }
)

export default Input