import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')

    const handleClick = e => {
        setCurrent(e.key)
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="dark">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <SubMenu icon={<SettingOutlined />} title="User">

                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>


            </SubMenu>
            <Item key="login" icon={<UserOutlined />} >
                <Link to="/login">Login</Link>
            </Item>
            <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
            </Item>


        </Menu>
    )
}

export default Header
