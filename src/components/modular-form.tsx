import React, { useRef, useState } from "react";
import { z } from "zod";
import {
  Select,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Field type definition
type Field = {
  id: string;
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "color"
    | "date"
    | "datetime-local"
    | "file"
    | "number"
    | "radio"
    | "checkbox"
    | "range"
    | "search"
    | "url"
    | "time"
    | "week"
    | "dropdown";
  label?: string;
  multiple?: boolean;
  options?: string[];
  dependsOn?: {
    field: string;
    value: string;
  };
  styles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    input?: React.CSSProperties;
    error?: React.CSSProperties;
  };
};

// Dynamically generate a Zod validation schema
const generateValidationSchema = (fields: Field[]) => {
  const schema: any = {};
  fields.forEach((field) => {
    if (field.type === "email") {
      schema[field.id] = z
        .string()
        .email("Please enter a valid email")
        .nonempty("Email is required");
    } else if (field.type === "password") {
      schema[field.id] = z
        .string()
        .min(6, "Password should be at least 6 characters");
    } else if (["text", "tel", "url"].includes(field.type)) {
      schema[field.id] = z
        .string()
        .nonempty(`${field.label || "This field"} is required`);
    } else if (field.type === "number") {
      schema[field.id] = z
        .number()
        .min(1, `${field.label || "This field"} must be greater than 0`);
    } else if (["dropdown", "radio"].includes(field.type)) {
      schema[field.id] = z
        .string()
        .nonempty(`${field.label || "This field"} is required`);
    } else if (field.type === "checkbox") {
      schema[field.id] = z
        .array(z.string())
        .min(1, `${field.label || "This field"} is required`);
    } else if (field.type === "file") {
      schema[field.id] = z
        .instanceof(FileList)
        .refine(
          (files) => files?.length > 0,
          `${field.label || "This field"} is required`
        );
    }
  });
  return z.object(schema);
};

type DynamicFormProps = {
  config: Field[];
};

const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
  const validationSchema = generateValidationSchema(config);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors ,isValid},
    watch,
    reset,
    
    
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: config.reduce((acc, field) => {
      acc[field.id] = field.type === "checkbox" ? [] : "";
      return acc;
    }, {} as Record<string, any>),
  });


  // Check if a field should be visible based on dependencies
  const isFieldVisible = (field: Field): boolean => {
    if (!field.dependsOn) return true;

    const { field: dependentField, value } = field.dependsOn;
    const currentValue = formData[dependentField];

    // If the dependent field is not set, don't show the field
    if (!currentValue) return false;

    // If value is an array, check if current value matches any in the array
    if (Array.isArray(value)) {
      return value.includes(currentValue);
    }

    // If value is a single string, do exact match
    return currentValue === value;
  };

  // Render form field dynamically
  const renderField = (field: Field) => {
    // if (!isFieldVisible(field)) return null;
    const isVisible = isFieldVisible(field);

    // If the field is not visible, don't render it
    if (!isVisible) {
      return null;
    }
    // Default styles with option to override
    const defaultStyles = {
      container: { marginBottom: "1rem", ...field.styles?.container },
      label: { ...field.styles?.label },
      input: { width: "100%", ...field.styles?.input },
      error: { color: "red", ...field.styles?.error },
    };

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "url":
      case "date":
      case "number":
        return (
          <div style={defaultStyles.container}>
            <TextField
              {...register(field.id)}
              id={field.id}
              label={field.label}
              type={field.type}
              fullWidth
              error={!!errors[field.id]}
              helperText={errors[field.id]?.message?.toString() || ""}
              inputProps={{
                style: defaultStyles.input,
              }}
              InputLabelProps={{
                style: defaultStyles.label,
              }}
              FormHelperTextProps={{
                style: defaultStyles.error,
              }}
            />
          </div>
        );

      case "dropdown":
        return (
          <div style={defaultStyles.container}>
            <FormControl fullWidth error={!!errors[field.id]}>
              <InputLabel style={defaultStyles.label}>{field.label}</InputLabel>
              <Controller
                name={field.id}
                control={control}
                render={({ field: controllerField }) => (
                  <Select
                    {...controllerField}
                    style={defaultStyles.input}
                    inputProps={{ style: defaultStyles.input }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText style={defaultStyles.error}>
                {errors[field.id]?.message?.toString() || ""}
              </FormHelperText>
            </FormControl>
          </div>
        );

      case "radio":
        return (
          <div style={defaultStyles.container}>
            <FormControl error={!!errors[field.id]}>
              <RadioGroup row>
                {field.options?.map((option) => (
                  <FormControlLabel
                  key={`${field.id}-${option}`}
                    value={option}
                    control={<Radio style={defaultStyles.input} />}
                    label={option}
                    {...register(field.id)}
                    style={defaultStyles.label}
                  />
                ))}
              </RadioGroup>
              <FormHelperText style={defaultStyles.error}>
                {errors[field.id]?.message?.toString() || ""}
              </FormHelperText>
            </FormControl>
          </div>
        );

      case "checkbox":
        return (
          <div style={defaultStyles.container}>
            <FormGroup style={defaultStyles.input}>
              {field.options?.map((option) => (
                <FormControlLabel
                  style={defaultStyles.label}
                  key={`${field.id}-${option}`}
                  control={
                    <Controller
                      name={field.id}
                      control={control}
                      render={({ field: controllerField }) => (
                        <Checkbox
                          {...controllerField}
                          checked={
                            controllerField.value?.includes(option) || false
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const newValue = checked
                              ? [...(controllerField.value || []), option]
                              : controllerField.value?.filter(
                                  (val: string) => val !== option
                                );
                            controllerField.onChange(newValue);
                          }}
                        />
                      )}
                    />
                  }
                  label={option}
                />
              ))}
              <FormHelperText style={defaultStyles.error}>
                {errors[field.id]?.message?.toString() || ""}
              </FormHelperText>
            </FormGroup>
          </div>
        );

      case "file":
        return (
          <div style={defaultStyles.container}>
            <Controller
              name={field.id}
              control={control}
              render={({ field: { value, onChange } }) => {
                const [fileError, setFileError] = useState<string | null>(null);
                const fileInputRef = useRef<HTMLInputElement>(null);

                // Function to remove a specific file
                const handleRemoveFile = (indexToRemove: number) => {
                  // Create a new array excluding the file at the specified index
                  const updatedFiles = value.filter(
                    (_: File, index: number) => index !== indexToRemove
                  );

                  // Update the form value with the new array of files
                  onChange(updatedFiles);

                  // Reset the file input if no files remain
                  if (updatedFiles.length === 0 && fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }

                  // Clear any previous errors
                  setFileError(null);

                  // Properly update the file input
                  if (fileInputRef.current) {
                    const dataTransfer = new DataTransfer();
                    updatedFiles.forEach((file: File) =>
                      dataTransfer.items.add(file)
                    );
                    fileInputRef.current.files = dataTransfer.files;
                  }
                };

                return (
                  <FormControl fullWidth error={!!fileError}>
                    <input
                      ref={fileInputRef}
                      style={defaultStyles.input}
                      type="file"
                      multiple={field.multiple}
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        try {
                          // Attempt to validate files
                          onLoadFileValidate(files);
                          // If validation passes, clear any previous errors and set files
                          setFileError(null);

                          // Combine existing files with new files if multiple is allowed
                          const combinedFiles = field.multiple
                            ? [...(value || []), ...files]
                            : files;

                          onChange(combinedFiles);
                        } catch (error) {
                          // If validation fails, set error and don't update files
                          setFileError(
                            error instanceof Error
                              ? error.message
                              : "Invalid file"
                          );
                          e.target.value = ""; // Clear the file input
                        }
                      }}
                    />
                    {value && value.length > 0 && (
                      <div>
                        {value.map((file: File, index: number) => (
                          <div
                          key={`${file.name}-${index}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            {file.type.startsWith("image/") ? (
                              <>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                  }}
                                />
                                <span>{file.name}</span>
                              </>
                            ) : file.type === "application/pdf" ? (
                              <span>PDF: {file.name}</span>
                            ) : (
                              <span>{file.name}</span>
                            )}
                            <Button
                              onClick={() => handleRemoveFile(index)}
                              style={{ marginLeft: "10px" }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {fileError && (
                      <FormHelperText style={defaultStyles.error} error>
                        {fileError}
                      </FormHelperText>
                    )}
                    {errors[field.id] && (
                      <FormHelperText error style={defaultStyles.error}>
                        {errors[field.id]?.message?.toString()}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />
          </div>
        );

      // case 'file':
      //   return (
      //     <Controller
      //       name={field.id}
      //       control={control}
      //       render={({ field: { value, onChange } }) => (
      //         <FormControl fullWidth>
      //           <input
      //             type="file"
      //             multiple={field.multiple}
      //             onChange={(e) => {
      //               const files = e.target.files ? Array.from(e.target.files) : [];
      //               if(onLoadFileValidate(files)){
      //                 onChange(files);

      //               }else{
      //                 e.target.value
      //               }
      //             }}
      //           />
      //           {value && value.length > 0 && (
      //             <div>
      //               {value.map((file: File, index: number) => (
      //                 <div key={index}>
      //                   {file.name}
      //                   {file.type.startsWith('image/') && (
      //                     <img
      //                       src={URL.createObjectURL(file)}
      //                       alt={file.name}
      //                       style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      //                     />
      //                   )}
      //                 </div>
      //               ))}
      //             </div>
      //           )}
      //           {errors[field.id] && (
      //             <FormHelperText error>
      //               {errors[field.id]?.message?.toString()}
      //             </FormHelperText>
      //           )}
      //         </FormControl>
      //       )}
      //     />
      //   );

      default:
        return null;
    }
  };

  

  const onLoadFileValidate = (files: File[]) => {
    // Validation configuration
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

    // Validate each file
    const validationErrors = files
      .map((file) => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
          return `File ${file.name} exceeds maximum size of 5MB`;
        }

        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          return `File ${file.name} has an invalid type. Allowed types: JPEG, PNG, PDF`;
        }

        return null;
      })
      .filter((error) => error !== null);

    // If there are validation errors, handle them
    if (validationErrors.length > 0) {
      // Option 1: Alert user
      // alert(validationErrors.join('\n'));

      // Option 2: Optionally, you can throw an error or return false
      throw new Error(validationErrors.join("\n"));
      return false;
    }

    return true;
  };

  
  const formData = watch();
  console.log("form data on change", formData);
// console.log("errors",errors);

  // Submit handler
  const onSubmit = async(data: Record<string, any>) => {
    alert("form submit")
    console.log("Form Submitted", data);
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {config.map((field) => (
        <div key={field.id} style={{ marginBottom: "1rem" }}>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;