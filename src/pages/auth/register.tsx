import React from "react";
import { fullSchema } from "../../utils/form-schema/user-form-schema";
import ModularForm from "../../components/modular-form";
import { z } from "zod";
import { FieldValues, Path } from "react-hook-form";
import { Container, Paper } from "@mui/material";

// Define a more flexible FormField type with conditional options for select and radio inputs
type FormField<T extends FieldValues> = {
  name: Path<T>; // Field name, which must match one of the keys of T
  label: string; // Label for the field
  type?: "text" | "password" | "email" | "select" | "radio"; // Type of input field
  options?: string[]; // Only required for select and radio types
};

// Pick the required fields for the registration form from the full schema
const registrationSchema = fullSchema.pick({
  username: true,
  password: true,
  email: true,
  phone: true,
  confirmPassword: true,
  gender:true,
  country:true
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

function RegistrationPage() {
  const fields: FormField<RegistrationFormData>[] = [
    { name: "username", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"], // Options required for radio
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["USA", "Canada", "India", "Australia"], // Options required for select
    },
  ];

  const handleSubmit = (data: RegistrationFormData) => {
    console.log("Registration Data:", data);
  };

  return <>
  <Container sx={{p:4}}>
    <Paper sx={{p:4}}>
    <ModularForm schema={registrationSchema} fields={fields} onSubmit={handleSubmit} />
    </Paper>
  </Container>
  </>;
}

export default RegistrationPage;
