import React, {useEffect, useState} from "react";
import { Modal,Button} from "react-bootstrap";
import { Form, Col, Row, InputGroup } from 'react-bootstrap'
import { Formik, Field } from "formik";
import { useHistory, useParams } from "react-router";

import boardEmpty from 'app/Images/features/empty-board.svg'
import { getWorkSpaceTypeList } from 'app/core/apis/workSpaceType'
import { addNewWorkSpace, updateWP } from "app/core/apis/workSpace";
import { showNotification, type } from 'utilities/component/notification/Notification'
import { useDispatch, useSelector } from "react-redux";
import { mainWorkSpaceReducer } from "store/mainWorkSpaceReducer";

import FormSelectField from "app/Common/Form/FormSelect/FormSelect";
import * as yup from 'yup'

import './ModalAddWorkSpace.scss'

let schema = yup.object().shape({
    name: yup.string().trim().min(10).max(40).required('adadad'),
    workspacetypeId: yup.string().required(),
    description: yup.string().trim().min(0).max(60).required()
  });

const ModalAddWorkSpace = (props) => {
    const { handleModal, show, handleModalInvite, isAdd, initialValuesEdit } = props

    const [ workSpaceTypeList, setWorkSpaceTypeList ] = useState([])

    const curWP = useSelector(state => state.workSpace.curWP)

    const history = useHistory()
    const dispatch = useDispatch()
    let { id } = useParams()

    const fetchWorkSpaceTypeList = async () => 
    {
        const res = await getWorkSpaceTypeList()
        if (res && res.data.result && res.status == 200) {
            setWorkSpaceTypeList(res.data.data)
        } else {
            showNotification('Loading workspace type list failed', res.data.msg, type.danger ,3000)
        }
    } 

    useEffect(() => {
        fetchWorkSpaceTypeList()
    },[])

    const submitForm = async (values) => 
    {
        if(isAdd)
        {
            const res = await addNewWorkSpace({...values})
            handleModal('HIDE')
            if(res && res.data.result && res.status == 200)
            {
                //cho nay call API de them moi workspacee
                showNotification('Tạo mới không gian làm việc thành công', 'Thành công', type.succsess ,3000)
                history.push('/workspace')
                handleModalInvite('SHOW')
            }
            else
            {
                showNotification('Tạo mới không gian làm việc thất bại', res.data.msg, type.danger ,3000)
            }
        }
        else
        {
            const res = await updateWP({...values})
            handleModal('HIDE')
            if(res && res.data.result && res.status == 200)
            {
                //cho nay call API de them moi workspacee
                dispatch(mainWorkSpaceReducer({
                    ...curWP,
                    name: values.name,
                    description: values.description,
                    workspacetypeId: values.workspacetypeId,
                    type: 'updateCur'
                }))
                showNotification('Cập nhật không gian làm việc thành công', "thành công", type.succsess ,3000)
            }
            else
            {
                showNotification('Cập nhật không gian làm việ thất bại', res.data.msg, type.danger ,3000)
            }
        }
    }
    return (
        <Modal show={show} 
            onHide={() => handleModal('HIDE')}
            >
            <Row>
                <Col className="col-left" md={6}>
                <Modal.Header closeButton>
                    {
                        isAdd && <Modal.Title>Tạo mới một không gian làm việc</Modal.Title>
                    }
                    {
                        !isAdd && <Modal.Title>Chỉnh sửa thông tin không gian làm việc</Modal.Title>
                    }
                </Modal.Header>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => submitForm(values) }
                    initialValues={ isAdd ?{
                        name: '',
                        workspacetypeId: undefined,
                        description: '',
                    } : initialValuesEdit
                    }
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        isInvalid,
                        isSubmitting,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <h6>Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập bảng ở một vị trí.</h6>
                                <Form.Group  controlId="validationFormik01">
                                    <Form.Label>Tên không gian làm việc</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />
                                    <span>Đây là tên của công ty, nhóm hoặc tổ chức của bạn.</span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <FormSelectField
                                    controlId="validationFormik03"
                                    label="Loại không gian làm việc"
                                    type="text"
                                    name="workspacetypeId"
                                    array={workSpaceTypeList}
                                >
                                </FormSelectField>
                                <Form.Group  controlId="validationFormik03">
                                    <Form.Label>Mô tả không gian làm việc (Tùy chọn)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                        as="textarea"
                                    />
                                    <span>Đưa các thành viên của bạn vào bảng với mô tả ngắn về Không gian làm việc của bạn.</span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >Tiếp tục</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
                </Col>
                <Col className="col-right" md={6}>
                    <img src={boardEmpty} alt=""></img>
                </Col>
            </Row>
            
        </Modal>
    )
    
}

export default ModalAddWorkSpace


