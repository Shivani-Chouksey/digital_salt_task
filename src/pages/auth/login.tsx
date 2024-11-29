import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  SupervisedUserCircle,
} from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/auth/use-auth";
import { useAppDispatch } from "../../redux/store";
import { addLoginUser } from "../../redux/slices/login-user-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { useNavigate } from "react-router-dom";

// Define UserType
type UserType = {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  gender: string;
  image: string;
};

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type FormData = z.infer<typeof formSchema>;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const { auth: handleLogin, data, error, loading, success } = useAuth();
  const dispatch = useAppDispatch();

  const onSubmit = (formData: FormData) => handleLogin("auth/login", formData);

  // If data exists, dispatch the login user data
  useEffect(() => {
    if (data) {
      // Transform or map the data to match the UserType shape if needed
      const userData: UserType = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id,
        gender: data.gender,
        image: data.image,
      };
      dispatch(addLoginUser({ userData, success }));
    }
  }, [data, success, dispatch]);

  const loggedInData = useSelector((state: RootState) => state.loginUser); // Access login state from Redux
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInData.success) {
      navigate("/crud-paginated");
    }
  }, [loggedInData.success]);

  const socialLogins = [
    { icon: <GoogleIcon />, color: "#DB4437", name: "Google" },
    { icon: <FacebookIcon />, color: "#1877F2", name: "Facebook" },
    { icon: <AppleIcon />, color: "#000", name: "Apple" },
  ];

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.12)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "primary.main",
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Welcome Back
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisedUserCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: "primary.main", cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {socialLogins.map(({ icon, color, name }) => (
              <IconButton
                key={name}
                sx={{ border: 1, borderColor: "divider", color, p: 1.5 }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Sign Up
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
