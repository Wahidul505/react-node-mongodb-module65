import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{display:'flex', gap:'20px', justifyContent: 'center'}}>
            <Link to='/home'>Home</Link>
            <Link to='/user/add'>Add User</Link>
        </div>
    );
};

export default Header;