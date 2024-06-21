import React from 'react'
import Sidebar from '../../components/Sidebar'
import HomeMain from '../../components/HomeMain'

export default function Home(){
    return(
        <div className="home-container">
            <Sidebar />
            <HomeMain />
        </div>
    )
}