import React from "react";

import './ToggleWorkSpace.scss'

const ToggleWorkSpace = (props) => {
    const { className, image, name } = props

    return (
        <div className={className+" workspace-item"}>
            <img src={image} alt=""></img>
            <span>{name}</span>
        </div>
    )
}

export default ToggleWorkSpace