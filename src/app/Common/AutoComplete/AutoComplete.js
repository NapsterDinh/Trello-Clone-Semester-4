import { indexOf } from "lodash-es";
import React, { useEffect, useState, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import avt from '../../Images/features/1.jpg'
import { showNotification,type } from "utilities/component/notification/Notification";
import './AutoComplete.scss'
import { useSelector } from "react-redux";

const AutoComplete = (props) => 
{
    const [ users, setUsers ] = useState([])
    const [ text, setText ] = useState('')
    const [ suggestions, setSuggestions] = useState([])
    const { inviteList, setInviteList, allUser, usersWP } = props
    const ref = useRef(null)
    const ownerUser = useSelector(state => state.user.user)
    
    useEffect(() => {
        setUsers(allUser)
    }, [])

    const onHandleChoosePerson = (e, item) => {
        if(inviteList.filter(user => (user === item.email)).length !== 0)
        {
            setText('')
            showNotification(
                "Không thể mời người này",
                "Người này đã có trong danh sách mời !!!",
                type.danger,
                3000
            )
        }
        else if(item.email === ownerUser.email)
        {
            setText('')
            showNotification(
                "Không thể mời người này",
                "Bạn không thể mời chính mình được :((((",
                type.danger,
                3000
            )
        }
        else if(usersWP.filter(user => (user.email === item.email)).length !== 0)
        {
            setText('')
            showNotification(
                "Không thể mời người này",
                "Người nàyđang tham gia không gian làm việc này!!!",
                type.danger,
                3000
            )
        }
        else
        {
            const temp = users.filter(user => (user.email === item.email))
            inviteList.push(temp[0].email)
            setInviteList(inviteList)
            setText('')
        }
    }

    const removePersonFromInviteList = (item) => 
    {
        const array = [...inviteList]
        let index = array.findIndex((element) => element.email === item.email)
        if(index > -1)
        {
            array.splice(index,1)
            setInviteList(array)
        }
    }

    const onHandleChange = (text) => {
        let matches = []
        if(text.length > 0)
        {
            matches = users.filter(user => {
                const regex = new RegExp(`${text}`, "gi")
                return user.email.match(regex)
            })
        }
        setSuggestions(matches)
        setText(text)
    }

    const onBlur = () => 
    {
        ref.current.classList.remove('active')
        setTimeout(() => {
            setSuggestions([])
        }, 100)
    }

    const onFocus = () =>
    {
        ref.current.classList.add('active')
    }

    let classNameAutoComplete = inviteList.length === 0 ? "autocomplete-input-container" : "autocomplete-input-container is-empty"

    return( 
        <div className="multi-select-autocomplete-container">
            <div className={classNameAutoComplete} ref={ref}>
                <div className="autocomplete-selected" >
                    {
                        inviteList.length > 0 && 
                        inviteList.map((item,index) => (
                            <div key={"invite"+item._id} className="autocomplete-option">
                                <div className="member-container">
                                    <div className="member-info">
                                        <div className="full-name">{item.email}</div>
                                    </div>
                                    <i  className="fa fa-times" aria-hidden="true" onClick={() => removePersonFromInviteList(item)}></i>
                                </div>
                            </div>
                        ))
                    }
                    <input 
                        type="text" 
                        placeholder="ví dụ: calrissian@cloud.ci" 
                        className="autocomplete-input"
                        onChange={e => onHandleChange(e.target.value)}
                        onBlur={onBlur}
                        value={text}
                        onFocus={onFocus}
                    ></input>
                </div>
                {
                    suggestions.length > 0 && 
                    <ListGroup>
                    {
                        suggestions.map((item, index) => (
                            <ListGroup.Item key={"suggest"+item._id} onClick={(e) => onHandleChoosePerson(e, item)}>
                                    <div className="autocomplete-member-avatar">
                                        <img height="30" width="30" src={item.avatar} className="member-avatar"></img>
                                    </div>
                                    <div className="member-info">
                                            <div className="full-name">{item.name}</div>
                                            <span className="quiet sub-name">
                                                <span>Chưa đăng nhập gần đây</span>
                                            </span>
                                    </div>
                                </ListGroup.Item>
                        ))
                    }
                    </ListGroup>
                }
                
            </div>
        </div>
    )
}

export default AutoComplete