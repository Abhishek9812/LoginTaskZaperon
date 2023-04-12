import React, { useEffect, useState } from 'react';
import {
    CssBaseline,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userImage from '../images/ic_user.svg';
import { useHistory } from 'react-router-dom';


const theme = createTheme();


const Home = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');

    // Get the cookie value by name
    function getCookieValue(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    }




    useEffect(() => {
        let email = localStorage.getItem('userEmail');
        if (email) setEmail(email);
        else history.push('/login');

        setInterval(() => {
            // Check if the JWT token is present in the cookie
            const jwtToken = getCookieValue('jwtToken'); // Replace with the actual cookie name
            if (!jwtToken) {
                history.push('/login');
            }
        }, 24 * 60 * 60 * 1000);
    }, [])

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
                            <b style={{ color: '#0B3558', font: '48px/65px' }} >Welcome! {email.split('@')[0]}</b>
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Home;