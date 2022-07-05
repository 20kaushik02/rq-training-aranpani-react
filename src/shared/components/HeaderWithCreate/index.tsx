import React, { FC } from 'react'
import "./headerWithCreate.scss"

interface HeaderWithCreateProps {
    title: string;
    setFormVisible: Function;
    disableCreate?: boolean
}

const HeaderWithCreate: FC<HeaderWithCreateProps> = ({ title, setFormVisible, disableCreate }) => {

    return (
        <h1 className="font-bold">
            {title}
            {!disableCreate && <span className="create-project">
                <i className="icon-add-2" onClick={() => setFormVisible(true)} />
            </span>}
        </h1>
    )
}

export default HeaderWithCreate;