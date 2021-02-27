import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')

    let dispatch = useDispatch()
    let history = useHistory()

    const handleClick = e => {
        setCurrent(e.key)
    };

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="dark">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <SubMenu icon={<SettingOutlined />} title="User">

                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>


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
