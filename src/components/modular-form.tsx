import React from "react";
import { useForm, SubmitHandler, FieldValues, Path, FieldError } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, FormHelperText } from "@mui/material";

// Define the type for each form field
type FormField<T extends FieldValues> = {
  name: Path<T>; // Ensures compatibility with react-hook-form
  label: string; // Label for the form field
  type?: "text" | "password" | "email" | "select" | "radio"; // Input types: text, password, email, select, radio
  options?: string[]; // Options for select or radio button inputs
};

// Props for the ModularForm component
type ModularFormProps<T extends FieldValues> = {
  schema: ZodType<T>; // Zod schema for form validation
  fields: FormField<T>[]; // Array of form fields
  onSubmit: SubmitHandler<T>; // Submission handler
};

function ModularForm<T extends FieldValues>({ schema, fields, onSubmit }: ModularFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema), // Use Zod for validation
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }} // Style the form layout
    >
      {fields.map(({ name, label, type = "text", options }) => {
        if (type === "select") {
          return (
            <FormControl key={name} error={!!errors[name]}>
              <InputLabel>{label}</InputLabel>
              <Select
                {...register(name)}
                label={label}
                defaultValue=""
                error={!!errors[name]}
              >
                {options?.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors[name] && (
                <FormHelperText>{(errors[name] as FieldError)?.message}</FormHelperText>
              )}
            </FormControl>
          );
        }

        if (type === "radio") {
          return (
            <FormControl key={name} error={!!errors[name]}>
                <label>{label}</label>
              <RadioGroup {...register(name)} defaultValue="">
                {options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              {errors[name] && (
                <FormHelperText>{(errors[name] as FieldError)?.message}</FormHelperText>
              )}
            </FormControl>
          );
        }

        // Default case for text, password, email
        return (
          <TextField
            key={name as string}
            label={label}
            type={type}
            variant="outlined"
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
            {...register(name)}
          />
        );
      })}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default ModularForm;
