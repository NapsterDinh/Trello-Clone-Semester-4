import React, { useState, useEffect, useRef} from "react";
import { Col ,Form , InputGroup} from "react-bootstrap";
import { useSelector } from "react-redux";
import { showNotification,type } from "utilities/component/notification/Notification";
import { useParams } from "react-router";
import { getAllUserAndUserInWorkSpace, removeUser } from "app/core/apis/workSpace";
import LoadingOverlay from 'react-loading-overlay';

import ModalInviteTeamMates from "app/base/Modal/ModalInviteTeamMates/ModalInviteTeamMates";

import './PaneMember.scss'

const PaneMember =  () => 
{
    const [ users, setUsers ] = useState([])
    const [ listUserNotWP, setlistUserNotWP] = useState([])
    const [ userListGroupBoard, setuserListGroupBoard ] = useState([])
    const [ suggestions, setSuggestions] = useState([])
    const ownerUser = useSelector(state => state.user.user)
    const [ showInvite, setShowInvite ] = useState(false)
    const [ isActive, setIsActive ] = useState(true)

    let { id, type1 } = useParams()
    useEffect(() => {
        fetchAllUserAndUserInWorkSpace()
    }, [id, type1])

    const fetchAllUserAndUserInWorkSpace = async ()=> 
    {
        try {
            setIsActive(true)
            const res = await getAllUserAndUserInWorkSpace(id)
            if(res && res.data.result)
            {
                setUsers([...res.data.data.userWP])
                setSuggestions([...res.data.data.userWP])
                setlistUserNotWP([...res.data.data.listUserNotWP])
                setuserListGroupBoard([...res.data.data.userList])
            }
            else
            {
                showNotification('Loading user failed', res.data.msg, type.danger, 3000)
            }
            setIsActive(false)
        } catch (error) {
            setIsActive(false)
            showNotification('Loading user failed', error.message, type.danger, 3000)
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
            setSuggestions(matches)
        }
        else
        {
            setSuggestions([...users])
        }
    }

    const onBlur = () => 
    {
        setTimeout(() => {
            setSuggestions([...users])
        }, 100)
    }

    const removeUser = async (email) => 
    {
        try {
            setIsActive(true)
            const res = await removeUser()
            if(res && res.data.result)
            {
                showNotification('Loại bỏ thành viên thành công', 'Thành viên này không còn trong không gian làm việc nữa', type.danger, 3000)
            }
            else
            {
                showNotification('Loại bỏ thành viên thất bại', res.data.msg, type.danger, 3000)
            }
            setIsActive(false)
        } catch (error) {
            setIsActive(false)
            showNotification('Loại bỏ thành viên thất bại', error.message, type.danger, 3000)
        }
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
                                        <button className="primary btn-primary btn button-link autowrap" onClick={() => {
                                            setShowInvite(true)
                                        }}>
                                            Mời thành viên khác
                                        </button>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-member">
                {
                    isActive && 
                    <LoadingOverlay
                            active={isActive}
                            spinner
                            text={'Đợi 1 xíu...'}
                            >
                    </LoadingOverlay>
                }
                {
                    suggestions.length > 0 &&     
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
                                
                                <div className="options">
                                    {/* <span className="option board-count quiet"><span>Trên 0 bảng</span></span> */}
                                    {
                                        item?._id === ownerUser?._id &&
                                        <div className="option board-count">
                                            <span className="admin">Quản trị viên</span>
                                        </div>
                                    }
                                    {
                                        item?._id !== ownerUser?._id &&
                                        <button className="btn option button-link remove-button" onClick={() => removeUser(item.email)}>
                                            Loại bỏ
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ))                    
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
                </div>
                {
                    showInvite && 
                    <ModalInviteTeamMates 
                        showInvite={showInvite} 
                        handleModalInvite={setShowInvite} 
                        allUser={users.concat(listUserNotWP)}
                        usersWP={users}
                        id={id}
                    />
                }
                
            </div>
        </>
    )
}
export default PaneMember