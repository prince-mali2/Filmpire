import { styled } from '@mui/system';
import { AppBar, Button, Drawer, Toolbar as MuiToolbar } from '@mui/material';

const drawerWidth = 240;

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: drawerWidth,
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    marginLeft: 0,
  },
}));

const MenuButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
}));

const LinkButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    color: 'white !important',
    textDecoration: 'none',
  },
}));

export { Toolbar, MenuButton, DrawerStyled, DrawerPaper, LinkButton };
