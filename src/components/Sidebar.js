import React from 'react'
import girl from "../images/Profile-01.png"
import boy from "../images/Profile-02.png"
import InfoRow from "./InfoRow"

const Sidebar = (props) => {

    const image = boy;
    return (
        <section className="sidebar-container">
            <img className='profile-pic' src={image} alt="" />
            <div className="info-container">
                <h3 className="user-name">Devidas</h3>
                <InfoRow 
                    name="Gender"
                    value="Male"
                    />
                <InfoRow 
                    name="Age"
                    value="18"
                    />
            </div>
            <p className="user-id">
                <span className='info-name'>User ID : </span>
                <span className="info-value">6au932bs932</span>
            </p>
        </section>
    )
}

export default Sidebar;