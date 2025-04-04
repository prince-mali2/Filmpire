import { styled } from '@mui/material/styles';

const useStyles = () => ({
  Root: styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    height: '100%',
  })),

  Toolbar: styled('div')(({ theme }) => ({
    height: '70px',
  })),

  Content: styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
  })),
});

export default useStyles;
