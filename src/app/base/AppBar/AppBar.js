import React from 'react'
import logo from '../../Images/Logo/header-logo.gif'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { CustomToggle } from '../CustomToggle/IconToggle/IconToggle'
import DropDownWorkspace from '../Dropdown/DropdownWorkspace/DropdownWorkspace'
import CustomDropDropwProfile from '../Dropdown/CustomMenu/CustomDropDropwProfile'
import './AppBar.scss'

function AppBar()
{
    const user = useSelector(state => state.user.user)

    return (
        <header id="header" className="navbar-app">
            <div className="header-padding">
                <div className="header-logo image-container">
                    <a href="/workspace">
                        <img className="image" src={logo} alt=""></img>
                    </a> 
                </div>
                <DropDownWorkspace/>
                <div className="header-center">
                    <div style={{display: 'block', width: '100%', position: 'absolute'}}></div>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Tìm kiếm..."></input>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <Dropdown className="notification icon-toggle">
                    <Dropdown.Toggle className="notification" variant="success">
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                    </Dropdown.Toggle>
                </Dropdown>
                <CustomDropDropwProfile user={user}/>
            
            </div>
        </header>
    )
}

export default AppBar