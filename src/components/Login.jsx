import React, { useState } from 'react';
import {
    Button, CssBaseline, TextField, CircularProgress,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    InputAdornment,
    IconButton, circularProgressClasses
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userImage from '../images/ic_user.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

const FacebookCircularProgress = () => {
    return (
        <Box sx={{ position: "relative" }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
                }}
                size={19}
                thickness={5}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
                    animationDuration: "550ms",
                    position: "absolute",
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round"
                    }
                }}
                size={19}
                thickness={5}
            />
        </Box>
    );
}

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!validateEmail(email)) {
            setValidEmail(false);
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            setValidPassword(false);
            setLoading(false);
            return;
        }

        let data = { email, password };

        await axios.post("http://localhost:5000/login", data)
            .then((res) => {
                if (res.status === 200) {
                    const jwtToken = res.data.token; // Replace with the actual JWT token
                    const expirationTime = new Date(); // Set the expiration time for the cookie
                    expirationTime.setHours(expirationTime.getHours() + 1); // Set expiration time to 1 hour from now
                    // Save the JWT token in a cookie
                    document.cookie = `jwtToken=${jwtToken}; expires=${expirationTime.toUTCString()}; path=/`;
                    localStorage.setItem('userEmail', res.data.user.email);
                    setLoading(false);
                    history.push('/');
                } else {
                    setLoading(false);
                    alert("User not found");
                }
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });

    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">

                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                        <Box
                            width={100}
                            height={100}
                            display='flex'
                            justifyContent={'center'}
                            alignItems={'center'}
                            borderRadius="50%" // Makes the element a circle
                            bgcolor="#EFEFEF" // Replace with desired background color
                        >
                            <img style={{ width: '60px', height: '60px' }} src={userImage} alt="SVG" />
                        </Box>
                        <Typography component="h1" variant="h5">
                            <b style={{ color: '#0B3558', font: '48px/65px' }} >Welcome!</b>
                        </Typography>
                        <Typography component="p" variant="p" style={{ fontSize: '13px' }} >
                            Let's connect to your workplace.
                        </Typography>
                        <Typography component="p" variant="p" style={{ fontSize: '13px' }} >
                            Please enter your email to continue.
                        </Typography>

                        <Box component="form" onSubmit={e => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email Address"
                                color="primary"
                                type='email'
                                size="small"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                InputProps={{
                                    style: {
                                        color: '#0B3558', // Change the color to your desired color
                                    },
                                }}
                                autoFocus
                                helperText={!validEmail ? `Please enter a valid email` : ''}
                                FormHelperTextProps={{ style: { color: '#D9292B' } }}
                                error={!validEmail}
                            />



                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                helperText={!validPassword ? "Password must be 8 character long." : ''}
                                FormHelperTextProps={{ style: { color: '#D9292B' } }}
                                error={!validPassword}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                InputProps={{
                                    style: {
                                        color: '#0B3558', // Change the color to your desired color
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />


                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot Password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                                style={{ textTransform: 'none' }}
                                onClick={e => handleSubmit(e)}
                            >
                                {loading ? <FacebookCircularProgress /> : 'Sign In'}
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Login;