import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// RTE component to be used in the form
export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      {/* By using Controller, you ensure that the TinyMCE editor's value is synchronized with your form state */}
      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
         // if any change  in  field takes place then inform me and render it
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="8d7d7zaeu6nxk8sdw5rfsc3ll0lx8oi9zh77adxkk1htmwke" // Add your API key here
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            // The onEditorChange prop is set to onChange, which is a method provided
           //  by the Controller to handle value changes. This ensures that any changes
         //  in the editor are propagated to the form state managed by react-hook-form
            onEditorChange={onChange}
            value={value} // Ensure the editor's value is controlled
          />
        )}
      />
    </div>
  );
}


