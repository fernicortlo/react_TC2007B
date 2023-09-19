//Create Layout component for App element 
import { forwardRef } from 'react';
import { Layout } from 'react-admin';
import { AppBar, Layout, UserMenu, useLogout} from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation

const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <Menu>
        <MenuItem
            onClick={handleClick}
            ref={ref}
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <ExitIcon/>  logiii
        </MenuItem>
        <MenuItem
            onClick={handleSettingsClick}
            ref={ref}
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <SettingsIcon/>  Settings
        </MenuItem>
        
    </Menu>
    );
});

const MyUserMenu = () => (
    <UserMenu>
        {/* Your custom menu items */}
        {/* Include the logout button */}
        <MyLogoutButton />
        <MySettings/>
    </UserMenu>
);

const MyAppBar = () => <AppBar userMenu={<UserMenu />} />;

const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);

export default MyLayout;