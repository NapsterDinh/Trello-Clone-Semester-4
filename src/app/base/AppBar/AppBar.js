import React from 'react'
import logo from '../../Images/Logo/header-logo.gif'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { CustomToggle } from '../CustomToggle/IconToggle/IconToggle'
import DropDownWorkspace from '../Dropdown/DropdownWorkspace/DropdownWorkspace'
import './AppBar.scss'

const WorkspaceData = {
    current: {
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    },
    owner: [{
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    },{
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    },{
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    }],
    client: [{
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    },{
        _id: '123',
        id_WorkspaceType: 'abc',
        id_user: 'abc',
        description: 'CNPM'
    }] 
}

function AppBar()
{
    return (
        <header id="header" className="navbar-app">
            <div className="header-padding">
                <div className="header-logo image-container">
                    <img className="image" src={logo} alt=""></img>
                </div>
                <DropDownWorkspace WorkspaceData={WorkspaceData}/>
                {/* <DropdownButton className="header-lastest" title="Gần đây">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton className="header-marked" title="Đã đánh dấu sao">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton> */}
                <DropdownButton title="Tạo mới" className="header-create">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
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

                <Dropdown className="profile icon-toggle">
                    <Dropdown.Toggle className="" variant="success">
                    </Dropdown.Toggle>
                </Dropdown>
            
            </div>
        </header>
    )
}

export default AppBar