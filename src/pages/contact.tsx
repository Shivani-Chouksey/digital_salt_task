import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "../styles/contact.scss";
import { useAppDispatch } from "../redux/store";
import { ContactFormData } from "../utils/interfaces/contact-form-interface";
import { addUser } from "../redux/slices/user-slice";

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    userName: null,
    email: null,
    contactNumber: null,
    address: null,
    gender: null,
    image: null,
  });
const dispatch=useAppDispatch();

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
) => {
  const { name, value, type } = event.target as HTMLInputElement;

  if (type === "file") {
    const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });

        setFormData((prev) => ({
          ...prev,
          [name]: blob, // Store the blob in the state
        }));
      };

      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update state for non-file inputs
    }));
  }
};


  const onSubmitHandler = () => {
    console.log(formData);
    dispatch(addUser(formData));
  };

  return (
    <div className="contact">
      <h1>Fill Details</h1>
      <div className="contact-form-wrapper">
        <Box
          className="contact-form"
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="contactNumber"
                label="Contact Number"
                variant="outlined"
                name="contactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="profile-upload"
                name="image"
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleChange}
                fullWidth
              />
              {formData.image && (
                <p>
                  Uploaded File: <strong>{formData.image.name}</strong>
                </p>
              )}
            </Grid>
          </Grid>
          <Button onClick={onSubmitHandler} variant="contained">
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Contact;
