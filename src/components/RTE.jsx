import React from 'react'
import{Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

// here RTE is a component to be used in the form
// here the parameter control from react-hook-form will help in using states from this component to the form
export default function RTE(name,control,label,defaultValue='') {

  return (
    <div className='w=full'
    >
        {label&&<label className='inline-block mb-1 pl-1'>
                {label}
            </label>}
        {/* By using Controller, you ensure that the TinyMCE editor's value is synchronized with your form state.
        just another way like register and handleSubmit from useForm */}
        <Controller
            name={name||'content'}
            // this control is from the input parameter
            control={control}
            // if any change  in  field takes place then inform me and render it
            render={({field: {onChange}})=>(
                <Editor
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}

                    // The onEditorChange prop is set to onChange, which is a method provided
                    //  by the Controller to handle value changes. This ensures that any changes
                    //  in the editor are propagated to the form state managed by react-hook-form.
                    onEditorChange={onChange}
                    /> 
            )}
        
        />
    
    </div>
  )
}

