// import { forwardRef } from 'react';
// import { AppBar, Layout, UserMenu, useLogout } from 'react-admin';
// import { MenuItem } from '@mui/material';
// import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// // It's important to pass the ref to allow Material UI to manage the keyboard navigation

// const MyLogoutButton = forwardRef((props, ref) => {
//     const logout = useLogout();
//     const handleClick = () => logout();
//     return (
//         <Menu>
//         <MenuItem
//             onClick={handleClick}
//             ref={ref}
//             // It's important to pass the props to allow Material UI to manage the keyboard navigation
//             {...props}
//         >
//             <ExitIcon /> Logout
//         </MenuItem>
        
//     </Menu>
//     );
// });

// const MyUserMenu = () => (
//     <UserMenu>
//         {/* Your custom menu items */}
//         {/* Include the logout button */}
//         <MyLogoutButton />
//         <MySettings/>
//     </UserMenu>
// );

// const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

// const MyLayout = (props) => (
//     <Layout {...props} appBar={MyAppBar} />
// );

// export default MyLayout;
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout } from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
export const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});

const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar = () => 
<AppBar 
    sx={{
        color: '#FF4B4B',
        background: 'white',
        '& .RaAppBar-toolbar': { padding: 0 },
    }}
    UserMenu={<MyUserMenu />} />;

const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);

export default MyLayout;