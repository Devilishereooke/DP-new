import React from 'react'
import girl from "../images/Profile-01.png"
import boy from "../images/Profile-02.png"
import InfoRow from "./InfoRow"

const Sidebar = ({name, userId, gender, age}) => {

    const image = (gender === 'Male' ? boy : girl);
    return (
        <section className="sidebar-container">
            <img className='profile-pic' src={image} alt="" />
            <div className="info-container">
                <h3 className="user-name">{name}</h3>
                <InfoRow 
                    name="Gender"
                    value={gender}
                    />
                <InfoRow 
                    name="Age"
                    value={age}
                    />
            </div>
            <p className="user-id">
                <span className='info-name'>UID : </span>
                <span className="info-value" style={{color : '#696969'}}>{userId}</span>
            </p>
        </section>
    )
}

export default Sidebar;