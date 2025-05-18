import { styled,Button, Typography } from "@mui/material";

const Container = styled('div')(({ theme }) => ({

    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',

  
}));

const Buttonn = styled(Button)(({ theme }) => ({
    margin: '30px 2px'  
}));

const PageNumber = styled(Typography)(({ theme }) => ({

    margin:' 0 20px !important',
    color: theme.palette.text.primary

  
}));

export {Container, Buttonn, PageNumber};