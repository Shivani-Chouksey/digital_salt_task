// import React, { useState } from 'react';

// interface Field {
//   id: string;
//   type:
//     | 'text'
//     | 'email'
//     | 'password'
//     | 'tel'
//     | 'color'
//     | 'date'
//     | 'datetime-local'
//     | 'file'
//     | 'number'
//     | 'radio'
//     | 'checkbox'
//     | 'range'
//     | 'search'
//     | 'url'
//     | 'time'
//     | 'week'
//     | 'dropdown'
//     | 'submit'
//     | 'reset'
//     | 'hidden'
//     | 'month';
//   label?: string;
//   multiple?: boolean;
//   options?: string[];
//   value?: string;
//   dependsOn?: {
//     field: string;
//     value: string;
//   };
//   styles?: {
//     container?: string;
//     label?: string;
//     input?: string;
//   };
// }

// const DynamicForm: React.FC<{ config: Field[] }> = ({ config }) => {
//   const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

//   // Handle input change
//   const handleChange = (id: string, value: any) => {
//     setFormValues(prev => ({ ...prev, [id]: value }));
//   };

//   // Handle file input change
//   const handleFileChange = (id: string, files: FileList | null) => {
//     if (!files) return;
//     const newFiles = Array.from(files);
//     handleChange(id, newFiles);
//   };

//   // Remove file from preview
//   const handleRemoveFile = (id: string, index: number) => {
//     const updatedFiles = formValues[id].filter((_: any, i: number) => i !== index);
//     handleChange(id, updatedFiles);
//   };

//   // Determine field visibility based on "dependsOn"
//   const isFieldVisible = (field: Field): boolean => {
//     if (!field.dependsOn) return true;
//     const { field: dependentField, value } = field.dependsOn;
//     return formValues[dependentField] === value;
//   };

//   // Render each input type
//   const renderField = (field: Field) => {
//     if (!isFieldVisible(field)) return null; // Skip rendering if not visible

//     switch (field.type) {
//       case 'text':
//       case 'email':
//       case 'password':
//       case 'tel':
//       case 'color':
//       case 'date':
//       case 'datetime-local':
//       case 'number':
//       case 'url':
//       case 'time':
//       case 'week':
//         return (
//           <input
//             type={field.type}
//             id={field.id}
//             className={`border p-2 w-full ${field.styles?.input || ''}`}
//             value={formValues[field.id] || ''}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//           />
//         );

//       case 'dropdown':
//         return (
//           <select
//             id={field.id}
//             className={`border p-2 w-full ${field.styles?.input || ''}`}
//             value={formValues[field.id] || ''}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//           >
//             <option value="">Select</option>
//             {field.options?.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         );

//       case 'radio':
//         return (
//           <div className={`flex gap-2 ${field.styles?.container || ''}`}>
//             {field.options?.map(option => (
//               <label key={option} className={`inline-flex items-center ${field.styles?.label || ''}`}>
//                 <input
//                   type="radio"
//                   name={field.id}
//                   value={option}
//                   checked={formValues[field.id] === option}
//                   onChange={() => handleChange(field.id, option)}
//                   className={`mr-2 ${field.styles?.input || ''}`}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         );

//       case 'checkbox':
//         return (
//           <div className={`flex gap-2 ${field.styles?.container || ''}`}>
//             {field.options?.map(option => (
//               <label key={option} className={`inline-flex items-center ${field.styles?.label || ''}`}>
//                 <input
//                   type="checkbox"
//                   name={field.id}
//                   value={option}
//                   checked={formValues[field.id]?.includes(option)}
//                   onChange={(e) => {
//                     const checked = e.target.checked;
//                     const newValues = checked
//                       ? [...(formValues[field.id] || []), option]
//                       : formValues[field.id]?.filter((o: string) => o !== option);
//                     handleChange(field.id, newValues);
//                   }}
//                   className={`mr-2 ${field.styles?.input || ''}`}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         );

//       case 'file':
//         return (
//           <div className="file-input-container">
//             <input
//               type="file"
//               id={field.id}
//               multiple={field.multiple}
//               onChange={(e) => handleFileChange(field.id, e.target.files)}
//               className={`border p-2 ${field.styles?.input || ''}`}
//             />
//             {formValues[field.id] && formValues[field.id].length > 0 && (
//               <div className="file-preview mt-2">
//                 {formValues[field.id].map((file: File, index: number) => (
//                   <div key={index} className="file-item flex justify-between items-center">
//                     <span>{file.name}</span>
//                     {file.type.startsWith('image') && (
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={file.name}
//                         className="w-20 h-20 object-cover"
//                       />
//                     )}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveFile(field.id, index)}
//                       className="text-red-500 ml-2"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // Handle form submission and log form values
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form Values:', formValues);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {config.map(field => {
//         // Only render label if the field is visible
//         if (!isFieldVisible(field)) return null;

//         return (
//           <div key={field.id} className={`space-y-1 ${field.styles?.container || ''}`}>
//             {field.label && (
//               <label htmlFor={field.id} className={`block font-medium ${field.styles?.label || ''}`}>
//                 {field.label}
//               </label>
//             )}
//             {renderField(field)}
//           </div>
//         );
//       })}
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//     </form>
//   );
// };

// export default DynamicForm;



import React, { useState } from 'react';

interface Field {
  id: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'number'
    | 'radio'
    | 'checkbox'
    | 'range'
    | 'search'
    | 'url'
    | 'time'
    | 'week'
    | 'dropdown'
    | 'submit'
    | 'reset'
    | 'hidden'
    | 'month';
  label?: string;
  multiple?: boolean;
  options?: string[];
  value?: string;
  dependsOn?: {
    field: string;
    value: string;
  };
  styles?: {
    container?: string;
    label?: string;
    input?: string;
  };
}

const DynamicForm: React.FC<{ config: Field[] }> = ({ config }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  
  // Handle input change
  const handleChange = (id: string, value: any) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  // Handle file input change
  const handleFileChange = (id: string, files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    handleChange(id, newFiles);
  };

  // Remove file from preview
  const handleRemoveFile = (id: string, index: number) => {
    const updatedFiles = formValues[id].filter((_: any, i: number) => i !== index);
    handleChange(id, updatedFiles);
  };

  // Determine field visibility based on "dependsOn"
  const isFieldVisible = (field: Field): boolean => {
    if (!field.dependsOn) return true;
    const { field: dependentField, value } = field.dependsOn;
    return formValues[dependentField] === value;
  };

  // Render each input type
  const renderField = (field: Field) => {
    if (!isFieldVisible(field)) return null; // Skip rendering if not visible

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
      case 'color':
      case 'date':
      case 'datetime-local':
      case 'number':
      case 'url':
      case 'time':
      case 'week':
        return (
          <input
            type={field.type}
            id={field.id}
            className={`border p-2 w-full ${field.styles?.input || ''}`}
            value={formValues[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case 'dropdown':
        return (
          <select
            id={field.id}
            className={`border p-2 w-full ${field.styles?.input || ''}`}
            value={formValues[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className={`flex gap-2 ${field.styles?.container || ''}`}>
            {field.options?.map(option => (
              <label key={option} className={`inline-flex items-center ${field.styles?.label || ''}`}>
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formValues[field.id] === option}
                  onChange={() => handleChange(field.id, option)}
                  className={`mr-2 ${field.styles?.input || ''}`}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className={`flex gap-2 ${field.styles?.container || ''}`}>
            {field.options?.map(option => (
              <label key={option} className={`inline-flex items-center ${field.styles?.label || ''}`}>
                <input
                  type="checkbox"
                  name={field.id}
                  value={option}
                  checked={formValues[field.id]?.includes(option)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newValues = checked
                      ? [...(formValues[field.id] || []), option]
                      : formValues[field.id]?.filter((o: string) => o !== option);
                    handleChange(field.id, newValues);
                  }}
                  className={`mr-2 ${field.styles?.input || ''}`}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <div className="file-input-container">
            <input
              type="file"
              id={field.id}
              multiple={field.multiple}
              onChange={(e) => handleFileChange(field.id, e.target.files)}
              className={`border p-2 ${field.styles?.input || ''}`}
            />
            {formValues[field.id] && formValues[field.id].length > 0 && (
              <div className="file-preview mt-2">
                {formValues[field.id].map((file: File, index: number) => (
                  <div key={index} className="file-item flex justify-between items-center">
                    <span>{file.name}</span>
                    {file.type.startsWith('image') && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(field.id, index)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Handle form submission and log form values
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Values:', formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config.map(field => {
        // Only render label if the field is visible
        if (!isFieldVisible(field)) return null;

        return (
          <div key={field.id} className={`space-y-1 ${field.styles?.container || ''}`}>
            {field.label && (
              <label htmlFor={field.id} className={`block font-medium ${field.styles?.label || ''}`}>
                {field.label}
              </label>
            )}
            {renderField(field)}
          </div>
        );
      })}

      {/* Render an additional text box when 'California' is selected */}
      {formValues['location'] === 'California' && (
        <div className="space-y-1">
          <label htmlFor="californiaText" className="block font-medium">
            Additional Information for California:
          </label>
          <input
            type="text"
            id="californiaText"
            value={formValues['californiaText'] || ''}
            onChange={(e) => handleChange('californiaText', e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default DynamicForm;
