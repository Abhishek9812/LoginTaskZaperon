import * as React from 'react';
import { Box, Link, Grid } from '@mui/material';
import zaperonImage from '../images/zaperon_logo.png'
export default function StickyFooter() {
    return (

        <Box
            component="footer"
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            height={100}
            margin={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {/* <Container maxWidth="sm"> */}
            <Grid container className='f1'>
                <Grid item xs>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <p>Powered by</p>
                    <img style={{marginLeft:'10px',marginTop:'20px', width:"100px", height:"23px"}} alt='Image' src={zaperonImage} />
                    </div>
                </Grid>
                <Grid item style={{marginTop:'18px'}}>
                    <Link style={{marginRight:'20px'}} href="#" variant="body2">
                        <b>Need Help?</b>
                    </Link>
                    <Link href="#" variant="body2">
                        <b>Pryvacy Polocy <span style={{color:"#728391"}}>& </span>Terms</b>
                    </Link>
                </Grid>
            </Grid>
            {/* </Container> */}
        </Box>
    );
}