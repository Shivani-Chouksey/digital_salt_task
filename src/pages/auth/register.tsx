import DynamicForm from "../../components/modular-form";
import { Paper } from "@mui/material";

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
  value?: string;
  dependsOn?: {
    field: string;
    value: string;
  };
  styles?: {
    container?: object;
    label?: object;
    input?: object;
    error?: object;
  };
};

function RegistrationPage() {
  const formConfig: Field[] = [
    {
      id: "name",
      type: "text",
      label: "Name",
      styles: {
        container: { marginBottom: "2rem" },
        label: { color: "blue", fontSize: "18px" },
        input: { backgroundColor: "#f0f0f0" },
        error: { color: "red", fontWeight: "bold" },
      },
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      // ,styles: {
      // container: { marginBottom: '2rem' },
      // label: { color: 'blue', fontSize: '18px' },
      // input: { backgroundColor: '#f0f0f0' },
      // error: { color: 'red', fontWeight: 'bold' }}
    },
    { id: "password", type: "password", label: "Password" },
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      //  styles: {
      // container: { marginBottom: '2rem' },
      // label: { color: 'blue', fontSize: '18px' },
      // input: { backgroundColor: '#f0f0f0' },
      // error: { color: 'red', fontWeight: 'bold' }}
    },
    {
      id: "otherDynamicValue",
      type: "checkbox",
      label: "otherDynamicValue",
      options: ["1", "2", "3"],
      dependsOn: { field: "gender", value: "Other" },
    },
    {
      id: "check",
      type: "text",
      label: "Type Something",
      dependsOn: { field: "gender", value: "Male" }, // Show this field if 'test' checkbox has value '1'
    },
    {
      id: "hobby",
      type: "checkbox",
      label: "Hobbies",
      options: ["Reading", "Traveling", "Gaming"],
    },
    {
      id: "country",
      type: "dropdown",
      label: "Country",
      options: ["USA", "India", "Canada"],
      //  styles: {
      // container: { marginBottom: '2rem' },
      // label: { color: 'blue', fontSize: '18px' },
      // input: { backgroundColor: '#f0f0f0' },
      // error: { color: 'red', fontWeight: 'bold' }}
    },
    {
      id: "state",
      type: "dropdown",
      label: "State",
      options: ["California", "Texas", "New York"],
      dependsOn: { field: "country", value: "USA" },
    },
    {
      id: "typeSomthing",
      type: "text",
      label: "Type Something Here",
      dependsOn: { field: "state", value: "California" },
    },
    {
      id: "checkValues",
      type: "checkbox",
      label: "Select One",
      options: ["Reading", "Traveling", "Gaming"],
      dependsOn: { field: "state", value: "Texas" },
    },
    {
      id: "type here",
      type: "text",
      label: "Type Something Here",
      dependsOn: { field: "check", value: "Reading" },
    },
    {
      id: "file",
      type: "radio",
      label: "Upload File",
      options: ["Single", "multiple"],
    },
    {
      id: "profilePicture",
      type: "file",
      label: "Profile Picture",
      multiple: false,
      dependsOn: { field: "file", value: "Single" },
    },
    {
      id: "gallery",
      type: "file",
      label: "Gallery",
      multiple: true,
      dependsOn: { field: "file", value: "multiple" },
    },
  ];

  return (
    <Paper className="App" sx={{ p: 4, border: "Highlight" }}>
      <DynamicForm config={formConfig} />
    </Paper>
  );
}

export default RegistrationPage;
