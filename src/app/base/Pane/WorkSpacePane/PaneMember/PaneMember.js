import React, { useState, useEffect, useRef} from "react";
import { Col ,Form , InputGroup} from "react-bootstrap";
import AutoComplete from "app/Common/AutoComplete/AutoComplete";
import { useSelector } from "react-redux";
import { showNotification,type } from "utilities/component/notification/Notification";

import ModalInviteTeamMates from "app/base/Modal/ModalInviteTeamMates/ModalInviteTeamMates";

import './PaneMember.scss'

const listUser = [
    {
        _id: '123',
        name: 'Tan Tu',
        email: 'tantudinh1@gmail.com',
        avatar: '1.jpg'
    },
    {
        _id: '321',
        name: 'Tan Tu',
        email: 'tantudinh2@gmail.com',
        avatar: '1.jpg'
    },
    {
        _id: '455',
        name: 'Tan Tu',
        email: 'tandinhtu@gmail.com',
        avatar: '1.jpg'
    },
    {
        _id: '156',
        name: 'Tan Tu',
        email: 'dinhtantu2@gmail.com',
        avatar: '1.jpg'
    },
    {
        _id: '745',
        name: 'Tan Tu',
        email: 'phamtienthao@gmail.com',
        avatar: '1.jpg'
    },
    {
        _id: '985',
        name: 'Tan Tu',
        email: 'dinhtutan1@gmail.com',
        avatar: '1.jpg'
    },
    
]

const PaneMember =  () => 
{
    const [ users, setUsers ] = useState([])
    const [ suggestions, setSuggestions] = useState([])
    const ownerUser = useSelector(state => state.user.user)
    const [ showInvite, setShowInvite ] = useState(false)

    useEffect(() => {
        setUsers([...listUser])
        setSuggestions([...listUser])
    }, [])

    const onHandleChange = (text) => {
        let matches = []
        if(text.length > 0)
        {
            matches = users.filter(user => {
                const regex = new RegExp(`${text}`, "gi")
                return user.email.match(regex)
            })
            setSuggestions(matches)
        }
        else
        {
            setSuggestions([...listUser])
        }
    }

    const onBlur = () => 
    {
        setTimeout(() => {
            setSuggestions([...listUser])
        }, 100)
    }

    return(
        <>
            <div className="org-members-page-layout-list">
                <div>
                    <div className="org-members-section active">
                        <div className="org-members-actions-container">
                            <div className="org-members-actions-header">
                                <h1>Các thành viên Không gian làm việc<span>&nbsp;</span>({users.length})</h1>
                            </div>
                            <div className="org-members-actions">
                                <Col md={5}>
                                    <p>Các thành viên trong Không gian làm việc có thể xem và tham gia tất cả các bảng Không gian làm việc hiển thị và tạo ra các bảng mới trong Không gian làm việc.</p>
                                </Col>
                                <Col md={6}>
                                <div className="form-group" >
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            placeholder="ví dụ: calrissian@cloud.ci" 
                                            className="autocomplete-input"
                                            onChange={e => onHandleChange(e.target.value)}
                                            onBlur={onBlur}
                                        ></input>
                                    </div>
                                </div>
                                    <div className="org-members-actions-add">
                                        <button className="primary btn-primary btn button-link autowrap" onClick={() => setShowInvite(true)}>
                                            Mời thành viên khác
                                        </button>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {
                    suggestions.length > 0 && 
                    <div className="list-member">
                        {
                            suggestions.map((item) => (
                                <div key={"suggest"+item._id} className="_1uE7ZPW8Qk7bmV" data-test-id="org-members-list">
                                    <div className="member-list-item-detail">
                                        <div className="member member-no-menu">
                                            <img height="30" width="30" src={item.avatar}
                                                className="member-avatar"></img>
                                        </div>
                                        <div className="details">
                                            <p className="name-line"><span className="full-name">{item.name}</span></p>
                                            <p className="u-bottom quiet"><span className="quiet u-inline-block"><span>{item.email}</span></span>
                                            </p>
                                        </div>
                                        <div className="options"><span className="option board-count quiet"><span>Trên 0 bảng</span></span>
                                            <div className="option board-count">
                                                <span className="admin">Quản trị viên</span>
                                            </div>
                                            <button className="btn option button-link remove-button">
                                                Loại bỏ
                                            </button>
                                            </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    !suggestions.length > 0 &&
                    <div className="_3C1ARRDXoDx7-m">
                        <img alt="Uh, không có ai ở đây có cái tên đó." className="_15AZHaZB4zq2Gi" src="https://a.trellocdn.com/prgb/dist/images/organization/missing.76c64abe1db1ea0f92df.svg"></img>
                        <div className="N6pxYXUylS_c1r">
                            Uh, không có ai ở đây với cái tên đó. Người đó có nên ở đây không? Mời họ ngay bây giờ!
                        </div>
                    </div>
                }
                <ModalInviteTeamMates showInvite={showInvite} handleModalInvite={setShowInvite}/>
            </div>
        </>
    )
}
export default PaneMember