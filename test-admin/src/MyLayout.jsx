import React, { forwardRef } from 'react';
import { AppBar, Layout, useLogout, UserMenu} from 'react-admin';
import { useTheme } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

const ThemedLogoutButton = () => {
    const theme = useTheme();
    return <ExitIcon style={{ color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f', }} />;
  };

export const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    <MenuItem
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <ThemedLogoutButton/> Cerrar Sesion
    </MenuItem>
  );
});
const MyDashboardButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    <MenuItem
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <ThemedLogoutButton/> Cerrar Sesion
    </MenuItem>
  );
});

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <MyLogoutButton />
  </UserMenu>
);

const MyAppBar = (props) => {
  const theme = useTheme();
  const appBarStyle = {
    background: theme.palette.mode === 'dark' ? 'transparent' : '#FFFFFF',
    color: theme.palette.mode === 'dark' ? '#b4d5b1' : '#b53f3f',
    '& .RaAppBar-toolbar': { padding: 0 },
  };
  return (
    <AppBar
      {...props}
      sx={appBarStyle}
      userMenu={<MyUserMenu/>}
    />
  );
};


const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar}/>
);
export default MyLayout;
