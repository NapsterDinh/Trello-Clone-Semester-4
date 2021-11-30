import React from "react";
import { Dropdown, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "store/userReducer";
import { getTokenReducer } from "store/getTokenReducer";
import { useHistory } from "react-router-dom";

import './CustomDropDropwProfile.scss'

const CustomDropDropwProfile = (props) => {
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = props

    const logout = () => {
        dispatch(userReducer(""));
        dispatch(getTokenReducer(""));  
        history.push("/login")
    }

    const customToggle = React.forwardRef(
        ({ children, onClick },ref) => {
        
        return(
            <div className="profile icon-toggle dropdown">
                <button 
                    ref={ref} 
                    aria-haspopup="true" 
                    aria-expanded="false" 
                    type="button" 
                    className="dropdown-toggle btn btn-success" 
                    onClick={(e) => {
                        e.preventDefault()
                        onClick(e)
                    }}
                    style={{backgroundImage: `url(${user.avatar})`}}
                    >
                </button>
            </div>
        )
        }
    );

    const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

        return (
            <div 
            className="custom-menu profile"
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
            >
                <Dropdown.Header>Tài khoản
                    <CloseButton aria-label="Hide" />
                </Dropdown.Header>
                <Dropdown.Divider/>
                <div className="profile-container dropdown-body">
                    <img src={user.avatar} alt="user-avatar"></img>
                    <div className="profile-content">
                        <h6>{user.name}</h6>
                        <span>{user.email}</span>
                    </div>
                </div>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey="0">Hồ sơ và hiển thị</Dropdown.Item>
                <Dropdown.Item eventKey="1">Hoạt động</Dropdown.Item>
                <Dropdown.Item eventKey="2">Thẻ</Dropdown.Item>
                <Dropdown.Item eventKey="3">Cài đặt</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey="4" onClick={() => logout()}>Đăng xuất</Dropdown.Item>
            </div>
        );
        },
    );
    return(
        <Dropdown className="profile icon-toggle">
            <Dropdown.Toggle as={customToggle}>
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu} >
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDropwProfile