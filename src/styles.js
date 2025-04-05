// AppStyles.js
import { styled } from '@mui/system';

export const Root = styled('div')({
  display: 'flex',
  height: '100vh',
});

export const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  width: '100%',
}));

export const ToolbarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));
