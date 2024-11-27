import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  IconButton, 
  InputAdornment, 
  Paper, 
  TextField, 
  Typography 
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  EmailOutlined, 
  PhoneOutlined, 
  LockOutlined, 
  UsbRounded,
  SupervisedUserCircle
} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted', formData);
  };

  const socialLogins = [
    { 
      icon: <GoogleIcon />, 
      color: '#DB4437', 
      name: 'Google' 
    },
    { 
      icon: <FacebookIcon />, 
      color: '#1877F2', 
      name: 'Facebook' 
    },
    { 
      icon: <AppleIcon />, 
      color: '#000000', 
      name: 'Apple' 
    }
  ];

  const loginHandler=()=>{
  
  }

  return (
    <Container maxWidth="xs" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      py: 4 
    }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          width: '100%', 
          borderRadius: 3,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: 'primary.main',
            mb: 3,
            fontWeight: 'bold'
          }}
        >
          Welcome Back
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2 
          }}
        >
          {/* Login Type Toggle */}
          {/* <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 2 
          }}>
            <Button
              variant={loginType === 'email' ? 'contained' : 'outlined'}
              onClick={() => setLoginType('email')}
              sx={{ mr: 2 }}
            >
              Email
            </Button>
            <Button
              variant={loginType === 'phone' ? 'contained' : 'outlined'}
              onClick={() => setLoginType('phone')}
            >
              Phone
            </Button>
          </Box> */}

          {/* Identifier Input */}
          <TextField
            fullWidth
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            label="User Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisedUserCircle />
                </InputAdornment>
              )
            }}
            required
          />

          {/* Password Input */}
          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            label="Password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 2, 
              py: 1.5,
              fontWeight: 'bold' 
            }}
            onClick={loginHandler}
          >
            Login
          </Button>

          {/* Forgot Password */}
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mt: 1, 
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Forgot Password?
          </Typography>

          {/* Social Login Divider */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          {/* Social Login Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2 
          }}>
            {socialLogins.map((social) => (
              <IconButton
                key={social.name}
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider',
                  color: social.color,
                  p: 1.5
                }}
                onClick={() => console.log(`Login with ${social.name}`)}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          {/* Signup Link */}
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 2 }}
          >
            Don't have an account? {' '}
            <Typography 
              component="span" 
              color="primary"
              sx={{ 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
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